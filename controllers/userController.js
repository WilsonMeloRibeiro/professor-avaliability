const user = require('../model/user');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');

const getUsers = async (req, res)=>{
    const result = await user.find();
    return res.status(200).json(result);
}
const registerUser = async (req, res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const plainPassword = req.body.password;
    const conflict = await user.findOne({email})
    if(conflict) return res.status(400).json("Email already taken")
    const password = await bcrypt.hash(plainPassword, salt);
    if(!username||!email || !password) return res.status(400).json("Username, email and password are required")
    const REFRESH_TOKEN = jwt.sign(
        {
            userInfo:{
                username: username,
                roles:{
                    user:200
                }
            }
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '24h'}

    )
    const ACCESS_TOKEN = jwt.sign(
        {
            userInfo:{
                username: username,
                roles:{
                    user:200
                }
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '30s'}

    )
    const result = await user.create({
    username,
    email,
    password,
    refreshToken: REFRESH_TOKEN
});
    console.log(result)
    res.cookie('jwt', REFRESH_TOKEN,{expiresIn: '24h', httpOnly: true})
    return res.json(ACCESS_TOKEN);
}

const updateUser = async (req, res)=>{
    const userFound = await user.findById(req.body.id)
    if(!userFound) return res.status(400).json('User not found');
    
    const {username, email} = req.body;
    userFound.username = username;
    userFound.email = email;
    
    const result = await userFound.save()
    return res.status(200).json(result);
}

const deleteUser = async (req, res)=>{
    const userFound = await user.findById(req.body.id) 
    if(!userFound) return res.status(400).json('User not found')
    await user.deleteOne(userFound)
    return res.status(200).json(`User ${userFound.username} Deleted`);
}

const getUser = async (req, res)=>{
    // if req.params._id is favicon.ico then response immediately
    if (req.params.id === "favicon.ico") {
        return res.status(404)
    }
    const userFound = await user.findById(req.params.id)
    if(!userFound) return res.status(400).json('User not found')
    return res.status(200).json(userFound)
}
module.exports = {getUsers, registerUser, updateUser, deleteUser, getUser}