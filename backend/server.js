const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const xss = require('xss');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '1mb' })); 

const COMMENTS_FILE = path.join(__dirname, 'comments.json');

// 限流
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15_000; 
const MAX_AUTHOR_LENGTH = 30;
const MAX_CONTENT_LENGTH = 600;

// 初始化
async function initFile() {
    try {
        await fs.access(COMMENTS_FILE);
    } catch {
        await fs.writeFile(COMMENTS_FILE, '[]', 'utf-8');
    }
}
initFile();

// 获取所有评论
app.get('/api/comments', async (req, res) => {
    try {
        const data = await fs.readFile(COMMENTS_FILE, 'utf-8');
        const comments = JSON.parse(data);
        const sorted = comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(sorted);
    } catch (err) {
        console.error('读取评论失败:', err.message);
        res.status(500).json({ error: '无法加载评论，稍后再试试' });
    }
});

app.post('/api/comments', async (req, res) => {
    const { author, content, postId } = req.body;

    if (!author || !content) {
        return res.status(400).json({ error: '特称和评论都要填捏' });
    }

    if (author.length > MAX_AUTHOR_LENGTH) {
        return res.status(400).json({ error: `昵称不能超过  $ {MAX_AUTHOR_LENGTH} 个字符` });
    }
    if (content.length > MAX_CONTENT_LENGTH) {
        return res.status(400).json({ error: `评论内容不能超过  $ {MAX_CONTENT_LENGTH} 字哦` });
    }

    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
               req.connection.remoteAddress ||
               req.socket.remoteAddress ||
               'unknown';

    // 4. 频率限制
    const now = Date.now();
    const lastTime = rateLimitMap.get(ip);
    if (lastTime && (now - lastTime) < RATE_LIMIT_WINDOW_MS) {
        return res.status(429).json({ error: '提交太频繁啦！再等等呢' });
    }

    try {
        const cleanAuthor = xss(author.trim(), { whiteList: {}, stripIgnoreTag: true });
        const cleanContent = xss(content.trim(), { whiteList: {}, stripIgnoreTag: true });

        if (!cleanAuthor || !cleanContent) {
            return res.status(400).json({ error: '内容包含非法字符' });
        }

        let comments = [];
        try {
            const data = await fs.readFile(COMMENTS_FILE, 'utf-8');
            comments = JSON.parse(data);
            if (!Array.isArray(comments)) comments = [];
        } catch (parseErr) {
            console.warn('comments.json 格式异常，重置为空数组');
            comments = [];
        }
        const newComment = {
            id: Date.now().toString(),
            author: cleanAuthor,
            content: cleanContent,
            postId: postId || 'global',
            createdAt: new Date().toISOString()
        };

        comments.unshift(newComment);
        await fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2), 'utf-8');
        rateLimitMap.set(ip, now);
        res.status(201).json(newComment);
    } catch (err) {
        console.error('保存评论失败:', err.message);
        res.status(500).json({ error: '留言提交失败，请稍后再试' });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`评论后端已启动：http://localhost: $ {PORT}`);
});