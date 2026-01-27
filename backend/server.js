const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const COMMENTS_FILE = path.join(__dirname, 'comments.json');


async function initFile() {
    try {
        await fs.access(COMMENTS_FILE);
    } catch {
        await fs.writeFile(COMMENTS_FILE, '[]');
    }
}
initFile();

app.get('/api/comments', async (req, res) => {
    try {
        const data = await fs.readFile(COMMENTS_FILE, 'utf-8');
        const comments = JSON.parse(data);
        // 新评论above
        const sorted = comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json(sorted);
    } catch (err) {
        console.error('读取评论失败:', err);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 提交评论
app.post('/api/comments', async (req, res) => {
    const { author, content, postId } = req.body;

    if (!author || !content) {
        return res.status(400).json({ error: '昵称和内容不能为空' });
    }

    try {
        const data = await fs.readFile(COMMENTS_FILE, 'utf-8');
        const comments = JSON.parse(data);

        const newComment = {
            id: Date.now().toString(),
            author: author.trim(),
            content: content.trim(),
            postId: postId || 'global',
            createdAt: new Date().toISOString()
        };

        comments.unshift(newComment);
        await fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2));

        res.status(201).json(newComment);
    } catch (err) {
        console.error('评论失败:', err);
        res.status(500).json({ error: '保存失败，请重试' });
    }
});

app.listen(PORT, () => {
    console.log(`后端启动：http://localhost: $ {PORT}`);
});