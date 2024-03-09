const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type: String, required: true, maxLength: 15, minLength: 3},
    password: {type: String, required: true},
    about: {type: String, maxLength: 100},
    datecreated: {type: Number, default: Date.now},
})

module.exports = mongoose.model("User", userSchema)