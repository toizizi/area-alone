import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase env vars');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const MAX_AUTHOR_LENGTH = 30;
const MAX_CONTENT_LENGTH = 600;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json(data);
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

      const cleanAuthor = author.trim().replace(/[<>'"&]/g, '');
      const cleanContent = content.trim().replace(/[<>'"&]/g, '');

      if (!cleanAuthor || !cleanContent) {
        return res.status(400).json({ error: '内容包含非法字符' });
      }

      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            author: cleanAuthor,
            content: cleanContent,
            post_id: postId || 'global',
          },
        ])
        .select();

      if (error) throw error;
      return res.status(201).json(data[0]);
    }

    res.status(405).json({ error: '方法不允许' });
  } catch (err) {
    console.error('Supabase API 错误:', err.message);
    res.status(500).json({ error: '留言提交失败，请稍后再试' });
  }
}