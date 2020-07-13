import React, { useState } from 'react'
import Axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import '../css/AuthPage.css'

const AuthPage = () => {
    const auth = useContext(AuthContext)

    const [authForm, setAuthForm] = useState({ login: '', password: '' })

    const changeHandler = event => {
        setAuthForm({ ...authForm, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        const res = await Axios.post('/api/auth/register', { ...authForm })
        console.log('зарегистрирован ', res.data)
    }

    const loginHandler = async () => {
        const res = await Axios.post('/api/auth/login', { ...authForm })
        console.log('вошел ', res.data)
        auth.login(res.data.token, res.data.userId, res.data.nickname)
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

    /*return (
        <div class="limiter">
            <div class="container-login100">
                <div class="wrap-login100">
                    <form class="login100-form validate-form p-l-55 p-r-55 p-t-178">
                        <span class="login100-form-title">Sign In</span>

                        <div class="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                            <input class="input100" type="text" name="username" placeholder="Username"></input>
                            <span class="focus-input100"></span>
                        </div>

                        <div class="wrap-input100 validate-input" data-validate="Please enter password">
                            <input class="input100" type="password" name="pass" placeholder="Password"></input>
                            <span class="focus-input100"></span>
                        </div>

                        <div class="text-right p-t-13 p-b-23">
                            <span class="txt1">Forgot</span>

                            <a href="#" class="txt2">Username / Password?</a>
                        </div>

                        <div class="container-login100-form-btn">
                            <button class="login100-form-btn">Sign in</button>
                        </div>

                        <div class="container-login100-form-btn">
                            <button class="login100-form-btn">Sign Up</button>
                        </div>

                        <div class="flex-col-c p-t-170 p-b-40">
                            <span class="txt1 p-b-9">Don’t have an account?</span>

                            <a href="#" class="txt3">Sign up now</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )*/
}

export default AuthPage