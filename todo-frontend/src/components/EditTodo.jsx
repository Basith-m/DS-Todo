import React, { useEffect, useState } from 'react'
import { LuFileEdit } from 'react-icons/lu'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editTodoAPI } from '../services/APIs';
import { todoChangeResponse } from '../redux/todoSlice/todoSlice';
import { useDispatch } from 'react-redux';

const EditTodo = ({ todoToEdit }) => {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const [todoData, setTodoData] = useState({ id: todoToEdit._id, todo: todoToEdit.todo })
    const [token, setToken] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
        else {
            setToken("")
        }
    }, [])

    const handleEdit = async (e) => {
        e.preventDefault()
        const { id, todo } = todoData
        if (!todo) {
            alert("Please write your todo...")
        } else {
            const reqHeader = {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }

            const result = await editTodoAPI(id, todoData, reqHeader)
            if (result.status === 200) {
                console.log(result.data);
                dispatch(todoChangeResponse(result.data))
                handleClose()
            } else {
                console.log(result);
                alert(result.response.data)
            }
        }
    }

    return (
        <>
            <LuFileEdit className='text-primary' style={{ cursor: 'pointer' }} title='Edit' onClick={handleShow} />

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <textarea className="form-control todo_input-area rounded" rows="10" placeholder='Write your todo here...' value={todoData.todo} onChange={(e) => setTodoData({ ...todoData, todo: e.target.value })} ></textarea>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className='rounded'>
                        Close
                    </Button>
                    <Button variant="success" className='rounded' onClick={handleEdit}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditTodo