import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosAddCircle } from "react-icons/io";
import { addTodoAPI } from '../services/APIs';
import { useDispatch } from 'react-redux';
import { todoChangeResponse } from '../redux/todoSlice/todoSlice';

const AddTodo = () => {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const [todoData, setTodoData] = useState({ todo: "" })
    const [token, setToken] = useState("")

    const handleClose = () => {
        setShow(false);
        setTodoData({ todo: "" })
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
        else {
            setToken("")
        }
    }, [])

    const handleAddTodo = async (e) => {
        e.preventDefault()
        const { todo } = todoData
        if (!todo) {
            alert("Please write your todo...")
        } else {
            const reqHeader = {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }

            const result = await addTodoAPI(todoData, reqHeader)
            if (result.status === 200) {
                console.log(result.data);
                dispatch(todoChangeResponse(result.data))
                setTodoData({ todo: "" })
                handleClose()
            } else {
                console.log(result);
                alert(result.response.data)
            }
        }
    }

    return (
        <>
            <IoIosAddCircle className='add-todo-btn' title='New Todo' onClick={handleShow} />

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <textarea className="form-control todo_input-area rounded" rows="10" placeholder='Write your todo here...' value={todoData.todo} onChange={(e) => setTodoData({ todo: e.target.value })} ></textarea>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className='rounded'>
                        Close
                    </Button>
                    <Button variant="success" className='rounded' onClick={handleAddTodo}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddTodo