const ChatModel = require("../models/ChatModel");
const MessageModel = require("../models/MessageModel");
const { createMessage } = require("../services/createMessageService");
const { NotFoundError, UnAuthorizedError } = require("../middleware/errors/httpErrors");

// sendMessage
const sendMessage = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { chatId } = req.params;
    const { text, img } = req.body;

    const message = await createMessage({ chatId, userId, text, img });

    return res.status(200).json({
      success: true,
      message
    });
  } catch (error) {
    next(error);
  }
};

// getMessage
const getMessage = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;

    const chat = await ChatModel.findById(chatId);
    if (!chat) throw new NotFoundError("Invalid Chat Id");

    const isMember = chat.members.some(
      m => m.toString() === userId.toString()
    );
    if (!isMember) throw new UnAuthorizedError("You are not part of this Chat");

    const messages = await MessageModel.find({ chatId })
      .populate("sender", "firstName lastName username profileImg")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessage,
  getMessage
};
