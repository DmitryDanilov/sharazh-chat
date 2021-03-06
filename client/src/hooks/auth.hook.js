import { useState, useCallback, useEffect } from 'react'
import socket from '../socket'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    //const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [nickname, setNickname] = useState(null)

    const login = useCallback((jwtToken, id, nick) => {
        setToken(jwtToken)
        setUserId(id)
        setNickname(nick)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, nickname: nick
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setNickname(null)

        localStorage.removeItem(storageName)

        socket.emit('user logout', token)
    }, [token])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if( data && data.token) {
            login(data.token, data.userId, data.nickname)
        }
        //setReady(true)
    }, [login])

    return { login, logout, token, userId, nickname/*, ready*/ }
}