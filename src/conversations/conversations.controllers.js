const uuid = require("uuid");
const Conversations = require("../models/conversations.models");
const Messages = require("../models/messages.models");
const Participants = require("../models/participants.models");
const Users = require("../models/users.models");


const findConversationsAll = async (id) => {
  const conversations = await Conversations.findAll({
    where:{
      id: id
    }
  });
  await Participants.findOne({
    where: {
      id: userId
    }
  })
  return conversations
};

const findConversationsById = async (userId) => {
  const conversations = await Conversations.findOne({
    where: {
      id: userId
    }
  });
  return conversations
};

const createConversation = async (conversationsObj) => {
  const userGuest = await Users.findOne({
    where: {
      id: conversationsObj.guestId
    }
  })
  if(!userGuest) return false
  const newConversation = await Conversations.create({
    id: uuid.v4(),
    name: conversationsObj.name,
    profileImage: conversationsObj.profileImage,
    isGroup: conversationsObj.isGroup
  })

  await Participants.create({
    id: uuid.v4(),
    userId: conversationsObj.ownerId,
    conversationId: newConversation.id,
    isAdmin: true
  })
  await Participants.create({
    id: uuid.v4(),
    userId: conversationsObj.guestId,
    conversationId: newConversation.id,
    isAdmin: false
  })
  return newConversation
};

const updateConversations = async(conversationId, conversationsObj) => {
  const selectedConversations = await Conversations.findOne({
    where: {
      id: conversationId
    }
  })
  if(!selectedConversations) return null
  const modifiedConversations = await selectedConversations.update(conversationsObj)
  return modifiedConversations
}

const deleteConversations = async(conversationId) => {
  const user = await Conversations.destroy({
    where: {
      id: conversationId
    }
  })
}

module.exports = {
  findConversationsAll,
  findConversationsById,
  createConversation,
  updateConversations,
  deleteConversations
};
