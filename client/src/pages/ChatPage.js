import React, { useState, useContext } from 'react'
import socket from '../socket'
import { AuthContext } from '../context/AuthContext'

const ChatPage = (props) => {
    const { token } = useContext(AuthContext)

    const { hist } = props
    const [history, setHistory] = useState(hist)

    const [message, setMessage] = useState('')


    socket.on('load history', hst => {
        setHistory(hst)
        console.log('load history')
    })

    socket.on('add message', msg => {
        console.log('add message')

        if (history) {
            setHistory([
                ...history,
                { ...msg }
            ])
        }
        else {
            setHistory([
                { ...msg }
            ])
        }
    })



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