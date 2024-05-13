const express = require('express')
const router = new express.Router()
const authController = require('../controllers/authController')
const todoController = require('../controllers/todoController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

// Register API
router.post('/user/register', authController.userRegister)

// Login API
router.post('/user/login', authController.userLogin)

// add todo
router.post('/todo/add', jwtMiddleware, todoController.addTodo)

// get todo
router.get('/todo/get', jwtMiddleware, todoController.getTodo)

// delete todo
router.delete('/todo/delete/:id', todoController.deleteTodo)

// edit todo
router.put('/todo/edit/:id', jwtMiddleware, todoController.editTodo)

module.exports = router