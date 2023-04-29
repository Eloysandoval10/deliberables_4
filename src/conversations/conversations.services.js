const Conversations = require('../models/conversations.models')
const conversationsControllers = require('./conversations.controllers')

const getAllConversations = (req, res) => {
    conversationsControllers.findConversationsAll()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({err: err.message})
        })
}

const getConversatiosById = (req, res) => {
    const conversationId = req.params.conversationId
    conversationsControllers.findConversationsById(conversationId)
    .then((data) => {
        if(data){
            res.status(200).json(data)
        } else {
            res.status(404).json({message: 'Invalid ID'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const newConversations = (req, res) => {
    const conversationsObj = req.body
    const ownerId = req.user.id
    conversationsControllers.createConversation({ ...conversationsObj, ownerId })
        .then(data => {
            if(!data) {
                return res.status(404).json({message: 'guest ID not exists'})
            }
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({err: err.message})
        }) 
}

const patchMyConversations = (req, res) => {
    const id = req.params.conversationId
    const { name, profileImage, isGroup } = req.body
    conversationsControllers.updateConversations(id, { name, profileImage, isGroup })
    .then(() => {
        res.status(200).json({message: 'Your user was edited succesfully!'})
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const deleteConversation = (req, res) => {
    const id= req.params.conversationId
    conversationsControllers.deleteConversations(id)
    .then((data) => {
        if(data){
            res.status(204).json()
        } else {
            res.status(404).json({message: `User with id:${id}, Not Found`})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {
    getAllConversations,
    newConversations,
    getConversatiosById,
    patchMyConversations,
    deleteConversation
}