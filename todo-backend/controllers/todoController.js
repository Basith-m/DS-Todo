const { response } = require('express')
const todos = require('../models/todoSchema')

// add todo
exports.addTodo = async (req, res) => {
    const userId = req.payload;
    const { todo } = req.body
    try {
        const newTodo = new todos({
            todo,
            userId
        })
        await newTodo.save()

        res.status(200).json(newTodo)
    } catch (error) {
        res.status("401").json(`todo adding failed !!! Error : ${error}`)
    }
}

// get todo
exports.getTodo = async (req, res) => {
    const userId = req.payload
    try {
        const result = await todos.find({ userId })
        res.status(200).json(result)
    }
    catch (error) {
        res.status(401).json(error)
    }
}


// delete todo
exports.deleteTodo = async (req, res) => {
    const { id } = req.params
    try {
        await todos.findByIdAndDelete(id)
        res.status(200).json("Deletion successful")
    } catch (error) {
        res.status(401).json(`Deletion fail Error : ${error}`)
    }
}

// edit todo
exports.editTodo = async (req, res) => {
    const userId = req.payload
    const { todo } = req.body
    const { id } = req.params;
    console.log(id);
    try {
        const editTodo = await todos.findByIdAndUpdate({ _id: id }, {
            todo, userId
        }, { new: true })
        await editTodo.save()
        res.status(200).json(editTodo)
    }
    catch (error) {
        res.status(401).json(`Updation failed Error : ${error}`)
    }
}