console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase env vars');
  module.exports = async function handler(req, res) {
    res.status(500).json({ error: '服务器配置错误' });
  };
  return;
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const MAX_AUTHOR_LENGTH = 30;
const MAX_CONTENT_LENGTH = 600;

module.exports = async function handler(req, res) {
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

      if (error) {
        console.error('Supabase GET error:', error);
        return res.status(500).json({ error: '获取评论失败' });
      }
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      let body = {};
      try {
        body = JSON.parse(req.body); // ⚠️ 注意：Vercel API 中 req.body 可能是字符串
      } catch (e) {
        return res.status(400).json({ error: '无效的 JSON 格式' });
      }

      const { author, content, postId } = body;

      if (!author || !content) {
        return res.status(400).json({ error: '昵称和评论都要填捏' });
      }

      if (author.length > MAX_AUTHOR_LENGTH) {
        return res.status(400).json({ error: `昵称不能超过  $ {MAX_AUTHOR_LENGTH} 个字符` });
      }
      if (content.length > MAX_CONTENT_LENGTH) {
        return res.status(400).json({ error: `评论内容不能超过  $ {MAX_CONTENT_LENGTH} 字哦` });
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

      if (error) {
        console.error('Supabase POST error:', error);
        return res.status(500).json({ error: '留言提交失败' });
      }
      return res.status(201).json(data[0]);
    }

    res.status(405).json({ error: '方法不允许' });
  } catch (err) {
    console.error('API 错误:', err);
    res.status(500).json({ error: '服务器内部错误' });
  }
};