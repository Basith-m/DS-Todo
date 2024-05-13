import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import EditTodo from '../components/EditTodo';
import AddTodo from '../components/AddTodo';

const Dashboard = () => {

    const [show, setShow] = useState(0)

    return (
        <div className='main-container d-flex flex-column align-items-center gap-3'>
            <h1>Todo App</h1>
            <div className="todo-container rounded shadow">
                <div className='d-flex align-items-center justify-content-between'>
                    <h2 className="todo_title">What’s On Your List?</h2>
                    <AddTodo />
                </div>
                <span className='delete-all-btn'>Delete All</span>
                <div className='todos rounded'>
                    <span className='todo-content'>Hi Hello</span>
                    <div className="todo-btn">
                        <EditTodo />
                        <MdDelete style={{ cursor: 'pointer' }} className='text-danger' title='Delete' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard