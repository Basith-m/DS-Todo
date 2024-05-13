const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

const todos = mongoose.model("todos", todoSchema)
module.exports = todos