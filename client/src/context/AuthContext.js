import { createContext } from 'react'

function loop() { }

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: loop,
    logout: loop,
    isAuthenticated: false
})