import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { registerAPI } from '../Services/allAPI';

function Register() {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        username: "", email: "", password: ""
    })

    const handleRegister = async (e) => {
        e.preventDefault();
        const { username, email, password } = userData
        if (!username || !email || !password) {
            alert("Please fill the form completely...")
        } else {
            // // api call
            // const response = await registerAPI(userData)
            // // console.log(response);
            // if (response.status === 200) {
            //     alert(`${response.data.username} has registered successfully...`)
            //     setUserData({
            //         username: '',
            //         email: '',
            //         password: ''
            //     })
            //     navigate('/')
            // }
        }
    }

    return (
        <div style={{ height: '100vh' }} className='d-flex align-items-center justify-content-center'>
            <div style={{ minWidth: '360px' }} className="d-flex flex-column gap-2 p-4 border border-1 shadow rounded">
                <h2>User Register</h2>
                <form className='d-flex flex-column gap-3' onSubmit={handleRegister}>
                    <input className='form-control rounded' type="text" placeholder='Username' onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                    <input className='form-control rounded' type="email" placeholder='Email' onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                    <input className='form-control rounded' type="password" placeholder='Password' onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                    <div>
                        <p>Already have an account - <Link to={'/'}>Sign In</Link></p>
                    </div>
                    <button className='btn btn-info rounded' type='submit'>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register