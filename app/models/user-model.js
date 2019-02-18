const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
})

const USER = mongoose.model('users', userSchema)

const userModelCreateUser = (user) => new USER(user).save()
const userModelGetUser = (username) => USER.findOne({ username })
const userModelUserExists = (username) => USER.countDocuments({ username })

module.exports = { userModelCreateUser, userModelGetUser, userModelUserExists }