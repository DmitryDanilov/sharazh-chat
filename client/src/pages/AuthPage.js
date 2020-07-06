import React, { useState } from 'react'
import Axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const AuthPage = () => {
    const auth = useContext(AuthContext)

    const [authForm, setAuthForm] = useState({ login: '', password: '' })

    const changeHandler = event => {
        setAuthForm({ ...authForm, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        const res = await Axios.post('/api/auth/register', { ...authForm })
        console.log(res.data)
    }

    const loginHandler = async () => {
        const res = await Axios.post('/api/auth/login', { ...authForm })
        console.log(res.data)
        auth.login(res.data.token, res.data.userId)
    }

    return (
        <div className='auth-page'>
            <div className='auth-form'>
                <div>
                    <input
                        id="login"
                        name="login"
                        value={authForm.login}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <input
                        id="password"
                        name="password"
                        value={authForm.password}
                        onChange={changeHandler}
                    />
                </div>
                <button
                    onClick={registerHandler}
                >Регистрация</button>
                <button
                    onClick={loginHandler}
                >Войти</button>
            </div>
        </div>
    )
}

export default AuthPage