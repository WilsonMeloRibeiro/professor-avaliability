const invitation = require('../model/invitation');
const mongoose = require('mongoose')

const getInvitations = async (req, res) => {
    const result = await invitation.find();
    return res.status(200).json(result);
}
const registerInvitation = async (req, res) => {
    const invitation_owner = req.body.invitation_owner;
    const invitation_destiny = req.body.invitation_destiny;
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const result = await invitation.create({
        title,
        description,
        invitation_destiny,
        invitation_owner,
        status
    });
    return res.json(result);
}

const updateInvitation = async (req, res) => {
    const invitationFound = await invitation.findById(req.body.id)
    if (!invitationFound) return res.status(400).json('invitation not found');

    const status = req.body.status;
    invitationFound.status = status;

    const result = await invitationFound.save()
    return res.status(200).json(result);
}

const deleteInvitation = async (req, res) => {
    const invitationFound = await invitation.findById(req.body.id)
    if (!invitationFound) return res.status(400).json('Invitation not found')
    await invitation.deleteOne(invitationFound)
    return res.status(200).json(`User ${invitationFound} Deleted`);
}

const getInvitation = async (req, res) => {
    // if req.params._id is favicon.ico then response immediately
    if (req.params.id === "favicon.ico") {
        return res.status(404)
    }
    const invitationFound = await invitation.findById(req.params.id)
    if (!invitationFound) return res.status(400).json('Invitation not found')
    return res.status(200).json(invitationFound)
}
module.exports = { getInvitations, registerInvitation, updateInvitation, deleteInvitation, getInvitation }