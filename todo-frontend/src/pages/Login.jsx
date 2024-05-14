import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI } from '../services/APIs'
// import { loginAPI } from '../Services/allAPI'

function Login() {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        email: "", password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = userData
        if (!email || !password) {
            alert("Please fill the form completely...")
        } else {
            // api call
            const response = await loginAPI(userData)
            if (response.status === 200) {
                sessionStorage.setItem("existingUser", JSON.stringify(response.data.existingUser))
                sessionStorage.setItem("token", response.data.token)
                setUserData({
                    email: "", password: ""
                })
                navigate('/dashboard')
            } else {
                alert(response.response.data)
            }
        }
    }

    return (
        <div style={{ height: '100vh' }} className='d-flex align-items-center justify-content-center'>
            <div style={{ minWidth: '360px' }} className="d-flex flex-column gap-2 p-4 border border-1 shadow rounded">
                <h2>User Login</h2>
                <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
                    <input className='form-control rounded' type="email" placeholder='Email' onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                    <input className='form-control rounded' type="password" placeholder='Password' onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                    <div>
                        <p>New User don't have account - <Link to={'/register'}>Sign Up</Link></p>
                    </div>
                    <button className='btn btn-info rounded' type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login