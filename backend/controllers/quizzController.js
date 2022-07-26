const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Quizz = require('../models/quizzModel')


//@desc Get quiz
//@route GET /api/quizz
//@access Public

// on fait des accés base de données donc on a besoin de fonction asynchrones

const getQuizz = asyncHandler( async (req,res) =>{ 
    
    const quizz = await Quizz.find()
    
    res.json(quizz)
})

//@desc Set quizz
//@route POST /api/quizz
//@access Private
const setQuizz =  asyncHandler( async (req,res) =>{

    // handle error

    if(!req.body){
        res.status(400)
        throw new Error('please add a quizz')
    }
    console.log(req.body)
    const quizz = await Quizz.create( req.body)
    res.json(quizz)
})

//@desc Update quizz
//@route PUT /api/quizz
//@access Private
const updateQuizz =  asyncHandler(  async (req,res) =>{
    const quizz = await Quizz.findById(req.params.id)
    
    if(!quizz){
        res.status(400)
      throw new Error('a quizz with this id doesn\'t exist')
    }

    const user = await User.findById(req.user.id)
    
    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    console.log(user.role);

    //Make sur the logged in user is an admin
    if(user.role !== "Admin"){
        res.status(301)
        throw new Error('User not authorized')
    }


    const updatedQUizz = await Quizz.findByIdAndUpdate(req.params.id,req.body,{new:true})

    res.json(updatedQUizz)
})

//@desc Gelete quizz
//@route DELETE /api/quizz
//@access Private
const deleteQuizz = asyncHandler( async (req,res) =>{
    const quizz = await Quizz.findById(req.params.id)
    
    if(!quizz){
        res.status(400)
      throw new Error('a quizz with this id doesn\'t exist')
    }

    const user = await User.findById(req.user.id)
    
    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sur the logged in user is an admin
    if(user.role !== "Admin"){
        res.status(301)
        throw new Error('User not authorized')
    }
  
    await quizz.remove()

    res.json({id:req.params.id})

})

module.exports = {
    getQuizz,
    setQuizz,
    updateQuizz,
    deleteQuizz
}