const express = require('express');
const router = express.Router();
const Message = require('../models/messagesModel');

// Get messages between two users
router.get('/:userId/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, recipientId: friendId },
        { senderId: friendId, recipientId: userId },
      ],
    }).sort({ timestamp: 1 }); 
    res.json(messages);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;