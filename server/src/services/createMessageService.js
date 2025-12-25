const ChatModel = require("../models/ChatModel");
const MessageModel = require("../models/MessageModel");
const { BadRequestError, NotFoundError, UnAuthorizedError } = require("../middleware/errors/httpErrors");

async function createMessage({ chatId, userId, text, img }) {
  if (!chatId || (!text && !img)) {
    throw new BadRequestError("Chat ID and message content Required");
  }

  const chat = await ChatModel.findById(chatId).populate(
    "members",
    "firstName lastName username profileImg"
  );

  if (!chat) throw new NotFoundError("Invalid Chat Id");

  const isMember = chat.members.some(
    m => m._id.toString() === userId.toString()
  );

  if (!isMember) {
    throw new UnAuthorizedError("You are not part of this chat");
  }

  const message = await MessageModel.create({
    chatId,
    sender: userId,
    text,
    img
  });

  chat.latestMessage = message._id;
  await chat.save();

  const populatedMessage = await message.populate([
    { path: "sender", select: "firstName lastName username profileImg" },
    { path: "chatId", select: "chatName members isGroupChat" }
  ]);

  return populatedMessage;
}

module.exports = { createMessage };
