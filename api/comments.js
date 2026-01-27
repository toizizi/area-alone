import fs from 'fs/promises';
import path from 'path';
import xss from 'xss';

const COMMENTS_FILE = path.join(process.cwd(), 'comments.json');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const MAX_AUTHOR_LENGTH = 30;
  const MAX_CONTENT_LENGTH = 600;

  try {
    if (req.method === 'GET') {
      let comments = [];
      try {
        const data = await fs.readFile(COMMENTS_FILE, 'utf8');
        comments = JSON.parse(data);
        if (!Array.isArray(comments)) comments = [];
      } catch (e) {
        console.warn('comments.json 格式异常，重置为空数组');
        comments = [];
      }
      const sorted = comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.status(200).json(sorted);
    }

    if (req.method === 'POST') {
      const { author, content, postId } = req.body;

      if (!author || !content) {
        return res.status(400).json({ error: '昵称和评论都要填捏' });
      }

      if (author.length > MAX_AUTHOR_LENGTH) {
        return res.status(400).json({ error: `昵称不能超过${MAX_AUTHOR_LENGTH} 个字符` });
      }
      if (content.length > MAX_CONTENT_LENGTH) {
        return res.status(400).json({ error: `评论内容不能超过${MAX_CONTENT_LENGTH} 字哦` });
      }

      const cleanAuthor = xss(author.trim(), { whiteList: {}, stripIgnoreTag: true });
      const cleanContent = xss(content.trim(), { whiteList: {}, stripIgnoreTag: true });

      if (!cleanAuthor || !cleanContent) {
        return res.status(400).json({ error: '内容包含非法字符' });
      }

      let comments = [];
      try {
        const data = await fs.readFile(COMMENTS_FILE, 'utf8');
        comments = JSON.parse(data);
        if (!Array.isArray(comments)) comments = [];
      } catch (e) {
        console.warn('comments.json 解析失败，重置为空数组');
        comments = [];
      }

      const newComment = {
        id: Date.now().toString(),
        author: cleanAuthor,
        content: cleanContent,
        postId: postId || 'global',
        createdAt: new Date().toISOString(),
      };

      comments.unshift(newComment);
      await fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2), 'utf8');

      return res.status(201).json(newComment);
    }

    res.status(405).json({ error: '方法不允许' });
  } catch (err) {
    console.error('API 错误:', err);
    res.status(500).json({ error: '留言提交失败，请稍后再试' });
  }
}