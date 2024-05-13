import React, { useState } from 'react'
import { LuFileEdit } from 'react-icons/lu'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditTodo = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    <textarea className="form-control todo_input-area rounded" rows="10" placeholder='Write your todo here...' ></textarea>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className='rounded'>
                        Close
                    </Button>
                    <Button variant="success" className='rounded'>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditTodo