import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import EditTodo from '../components/EditTodo';
import AddTodo from '../components/AddTodo';
import { deleteTodoAPI, getTodoAPI } from '../services/APIs';
import { todoChangeResponse } from '../redux/todoSlice/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MdLogout } from "react-icons/md";
import { setIsAuthorized } from '../redux/authSlice/authSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const todoResponse = useSelector(state => state.todoReducer)
    const isAuthorized = useSelector(state => state.authReducer)

    const [todos, setTodos] = useState([])

    const getTodos = async () => {
        try {
            if (sessionStorage.getItem("token")) {
                const token = sessionStorage.getItem("token")
                const reqHeader = {
                    "Content-type": "application/json", "Authorization": `Bearer ${token}`
                }
                const response = await getTodoAPI(reqHeader)
                if (response.status === 200) {
                    setTodos(response.data)
                } else {
                    console.log(response);
                    alert(response.response.data)
                }
            }
        } catch (error) {
            console.log(`Failed to fetch todo Error : ${error}`)
        }
    }

    const handleDelete = async (id) => {
        try {
            const result = await deleteTodoAPI(id)
            if (result.status === 200) {
                console.log(result.data);
                dispatch(todoChangeResponse(result.data))
            } else {
                console.log(result.response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = () => {
        // remove all existing user details
        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        dispatch(setIsAuthorized(false));
        console.log(isAuthorized);
        navigate('/login', { replace: true })
    }

    useEffect(() => {
        getTodos()
    }, [todoResponse])

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            dispatch(setIsAuthorized(true));
        } else {
            dispatch(setIsAuthorized(false));
            navigate('/login', { replace: true });
        }
    }, [dispatch, isAuthorized]);

    return (
        <div className='main-container d-flex flex-column align-items-center gap-3'>
            <h1>Todo App</h1>
            <button className='logout-btn' onClick={handleLogout}>
                <MdLogout />
                <span>Logout</span>
            </button>
            <div className="todo-container rounded shadow">
                <div className='d-flex align-items-center justify-content-between'>
                    <h2 className="todo_title">What’s On Your List?</h2>
                    <AddTodo />
                </div>
                {/* {
                    todos.length > 0 &&
                    <span className='delete-all-btn'>Delete All</span>
                } */}
                {
                    todos.length > 0 ? todos.map((todo, key) => (
                        <div className='todos rounded' key={key}>
                            <span className='todo-content'>{todo.todo}</span>
                            <div className="todo-btn">
                                <EditTodo todoToEdit={todo} />
                                <MdDelete style={{ cursor: 'pointer' }} className='text-danger' title='Delete' onClick={() => handleDelete(todo._id)} />
                            </div>
                        </div>
                    )) : <span className='text-center text-warning'>Your Todo is empty!!!</span>
                }
            </div>
        </div>
    )
}

export default Dashboard