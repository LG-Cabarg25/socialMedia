const db = require('../models/db');

exports.sendFriendRequest = async (req, res) => {
  const { friendId } = req.body;
  const userId = req.user.userId;
  try {
    await db('friends').insert({ user_id: userId, friend_id: friendId, status: 'pending' });
    res.status(201).json({ message: 'Friend request sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send friend request' });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  const { friendId } = req.params;
  const userId = req.user.userId;
  try {
    await db('friends').where({ user_id: friendId, friend_id: userId }).update({ status: 'accepted' });
    res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to accept friend request' });
  }
};

exports.getFriends = async (req, res) => {
  const userId = req.user.userId;
  try {
    const friends = await db('friends').where({ user_id: userId, status: 'accepted' }).orWhere({ friend_id: userId, status: 'accepted' });
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch friends' });
  }
};
