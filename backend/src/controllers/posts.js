  const db = require('../models/db');

  // Crear un post de texto
  exports.createTextPost = async (req, res) => {
    const { content } = req.body;
    try {
      const [postId] = await db('posts')
        .insert({
          user_id: req.user.userId,
          content,
          post_type: 'text', 
        })
        .returning('id');
      res.status(201).json({ message: 'Text post created successfully', postId });
    } catch (error) {
      console.error("Error inserting text post:", error);
      res.status(500).json({ error: 'Error creating text post' });
    }
  };

  // Crear un post con imagen
  exports.createImagePost = async (req, res) => {
    try {
      const imagePath = req.file.path;
      const { content } = req.body;

      const [postId] = await db('posts')
        .insert({
          user_id: req.user.userId,
          content,
          image_url: imagePath,
          post_type: 'image', 
        })
        .returning('id');
      res.status(201).json({ message: 'Image post created successfully', postId });
    } catch (error) {
      console.error("Error inserting image post:", error);
      res.status(500).json({ error: 'Error creating image post' });
    }
  };

  // Obtener todas las publicaciones
  exports.getPosts = async (req, res) => {
    try {
      const posts = await db('posts')
        .select('*')
        .orderBy('created_at', 'desc');
      res.json(posts);
    } catch (error) {
      console.error("Error retrieving posts:", error);
      res.status(500).json({ error: 'Error retrieving posts' });
    }
  };

  // Obtener una publicación específica
  exports.getPost = async (req, res) => {
    const { postId } = req.params;
    try {
      const post = await db('posts').where({ id: postId }).first();
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error("Error retrieving post:", error);
      res.status(500).json({ error: 'Error retrieving post' });
    }
  };

  // Dar "me gusta" a un post
  exports.likePost = async (req, res) => {
    const { id } = req.params;
    try {
      await db('posts').where({ id }).increment('likes_count', 1);
      res.json({ message: 'Post liked successfully' });
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).json({ error: 'Error liking post' });
    }
  };




// Eliminar una publicación
exports.deletePost = async (req, res) => {
  console.log("Delete request received for post ID:", req.params.postId);
  const { postId } = req.params;
  try {
    const deletedRows = await db('posts').where({ id: postId }).del();
    if (deletedRows) {
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: 'Error deleting post' });
  }
};
