const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const jwt = require("jsonwebtoken")

const User = require("../models/user")
const Message = require("../models/message")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// HOME
router.get("/home", asyncHandler(async (req, res, next) => {
  res.status(200).send("git")
})) 

// REGISTER
router.post("/sign-up", asyncHandler(async (req, res, next) => {
  const users = await User.findOne({username: req.body.username})
  if (users) {
    return res.status(400).json({error: "User already exists"})
  }

  bcrypt.hash(req.body.password, 5, async (err, hashedPassword) => {
    if (err) throw err
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      about: req.body.about
    })

    await user.save()
    return res.status(200).json({username: user.username})
  })

}))


// LOG OUT
router.post("/log-out", asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log(err)
      return next(err)
    }
  })
  res.status(200).send("logged out")
}))


// LOG IN
router.post("/log-in", asyncHandler(async (req, res, next) => {
  const user = await User.findOne({username: req.body.username})

  if (user) {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.status(401).json({error: "No user found"})
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }
      })
      const token = jwt.sign({user}, process.env.SECRET_KEY, {expiresIn: 600})
      res.cookie("token", token)
      res.status(200).json({user, token})
    })(req, res, next)
  } else {
    return res.status(401).json({error: "No user found"})
  }
}))

// GET ALL USERS HOME
router.get("/users/:user", asyncHandler(async (req, res, next) => {
  const users = await User.find()

  const usernames = users.map(user => ({username: user.username, about: user.about})).filter(userInfo => userInfo.username !== req.params.user)

  res.status(200).json(usernames)
}))

//GET MESSAGES
router.get("/messages/:user/:selectedUser", asyncHandler(async (req, res, next) => {
  const [from, to] = await Promise.all([
    User.findOne({username: req.params.user}),
    User.findOne({username: req.params.selectedUser})
  ])

  const messages = await Message.find({
    $or: [
      { from: from._id, to: to._id },
      { from: to._id, to: from._id }
    ]
  }).populate("from", "username");

  if (messages) {
    res.status(200).json(messages)
  } else {
    res.status(400).send("brak")
  }

}))
//CREATE MESSAGE
router.post("/message/send", asyncHandler(async (req, res, next) => {
  const [from, to] = await Promise.all([
    User.findOne({username: req.body.user}),
    User.findOne({username: req.body.selectedUser})
  ])

  const message = new Message({
    from: from._id,
    to: to._id,
    content: req.body.message,
  })

  await message.save()
  res.status(200).send("gud")

}))

//PROFILE GET DESCRIPTION
router.get("/profile/:user/description", asyncHandler(async (req, res, next) => {
  const about = await User.findOne({username: req.params.user}, "about")
  res.status(200).json(about)
}))

// PROFILE UPDATE
router.patch("/profile/description/update", asyncHandler(async (req, res, next) => {
  const user = await User.findOne({username: req.body.user})

  if (req.body.newUser) {
    user.username = req.body.newUser
  }
  
  if (req.body.newAbout) {
    user.about = req.body.newAbout
  }
  
  await user.save()
  res.status(200).send("gut")
}))

module.exports = router;
