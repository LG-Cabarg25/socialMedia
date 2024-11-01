// src/controllers/comments.js
const db = require('../models/db');

// Crear un comentario
exports.createComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const [commentId] = await db('comments').insert({
      post_id: postId,
      user_id: req.user.userId,
      content,
    });
    res.status(201).json({ message: 'Comment created successfully', commentId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating comment' });
  }
};

// Obtener todos los comentarios de un post
exports.getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await db('comments').where({ post_id: postId }).orderBy('created_at', 'asc');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving comments' });
  }
};

// Eliminar un comentario
exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedRows = await db('comments').where({ id: commentId }).del();
    if (deletedRows) {
      res.json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment' });
  }
};
