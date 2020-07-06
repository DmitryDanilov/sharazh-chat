import React, { useState, useContext, useEffect } from 'react'
import socket from '../socket'
import { AuthContext } from '../context/AuthContext'

const ChatPage = () => {
    const { token } = useContext(AuthContext)

    const [history, setHistory] = useState([])

    const [message, setMessage] = useState('')

    useEffect(() => {
        socket.on('load history', hst => {
            setHistory(hst)
            console.log('load history')
        })
    }, [])

    useEffect(() => {
        socket.on('add message', msg => {
            console.log('add message')

            setHistory([
                ...history,
                { ...msg }
            ])
        })

        return () => {
            socket.removeAllListeners('add message')
        }
    }, [history])

    

    const sendHandler = () => {
        setMessage('')

        socket.emit('new message', {
            token,
            message
        })
    }

    const changeHandler = (e) => {
        setMessage(e.target.value)
    }
    return (
        <div className="container">
            <ul>
                {
                    history && history.map((el, index) => {
                        return (<li key={index}>{el.message}</li>)
                    })
                }
            </ul>
            <input
                id='inputMessage'
                name='inputMessage'
                value={message}
                onChange={changeHandler}
            />
            <button
                onClick={sendHandler}>
                отправить
            </button>
        </div>
    )
}

export default ChatPage