const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//@desc Register new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password, role} = req.body

    if(!name || !email || !password || !role){
        res.status(400)
        throw new Error('please add all fields')
    }

    //Check if user exists

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('users with this email already exists')
    }

    // Hash the password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // Create user

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        alreadyPlayed:false
    })

    if(user){
        res.status(201).json({
           _id : user.id,
           name: user.name,
           email: user.email,
           role: user.role,
           token : generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Registration is failed')
    }

})

//@desc Authenticate a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body

    // Check for user 

    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id : user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            alreadyPlayed:user.alreadyPlayed,
            token : generateToken(user._id)
         })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }


})

//@desc Get users
//@route GET /api/users
//@access Private
const getUsers = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(400)
        res.json('User not found')
    }

    if(user.role !== 'Admin'){
        res.status(301)
        res.json('User not authorized')
    }

    const users = await User.find().select('-password')

    res.json(users)
    
})


//@desc Update user
//@route PUT /api/users
//@access Private
const updateUser =  asyncHandler(  async (req,res) =>{
    const user = await User.findById(req.user.id)
    
    if(!user){
        res.status(400)
      throw new Error('a user with this id doesn\'t exist')
    }
    //Make sur the logged in user is an admin
    if(user.role !== "User"){
        res.status(301)
        throw new Error('User not authorized')
    }

    console.log(req.body);
    userToUpdate ={
        name: user.name,
        email: user.email,
        role: user.role,
        note:req.body.note,
        quizz: req.body.quizz,
        alreadyPlayed:true

     }

    const updatedUser = await User.findByIdAndUpdate(user.id,userToUpdate,{new:true})
    res.json(updateUser)
})


// Generate JWT
const generateToken = (id) =>{
    
    return jwt.sign({id}, process.env.JWT_SECRET,
        {expiresIn:'30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    updateUser
}