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

exports.getFriendRequests = async (req, res) => {
  const userId = req.user.userId;
  try {
    const requests = await db('friends')
      .where({ friend_id: userId, status: 'pending' })
      .select('user_id as requesterId', 'status', 'created_at as requestedAt');
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error retrieving friend requests:', error);
    res.status(500).json({ error: 'Failed to retrieve friend requests' });
  }
};

exports.deleteFriendRequest = async (req, res) => {
  const { friendId } = req.params;
  const userId = req.user.userId;

  try {
      const deletedRows = await db('friends')
          .where(function() {
              this.where({ user_id: userId, friend_id: friendId })
                  .orWhere({ user_id: friendId, friend_id: userId });
          })
          .del();

      if (deletedRows) {
          res.status(200).json({ message: 'Friend request or friendship deleted successfully' });
      } else {
          res.status(404).json({ error: 'Friendship or request not found' });
      }
  } catch (error) {
      console.error('Error deleting friend request or friendship:', error);
      res.status(500).json({ error: 'Failed to delete friend request or friendship' });
  }
};