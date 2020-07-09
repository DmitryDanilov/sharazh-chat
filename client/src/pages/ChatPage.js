import React, { useState, useContext, useEffect } from 'react'
import socket from '../socket'
import { AuthContext } from '../context/AuthContext'
import Message from '../components/Message'
import User from '../components/User'

const ChatPage = () => {

    const { token, logout/*, userId*/ } = useContext(AuthContext)

    const [users, setUsers] = useState([])

    const [history, setHistory] = useState([])

    const [message, setMessage] = useState('')

    const [usersOnline, setUsersOnline] = useState([])

    useEffect(() => {
        socket.on('load history', data => {
            const { hst, us } = data

            //console.log('arr history', arr)

            setHistory(hst)
            setUsers(us)
            //setUsersOnline(arr)
            console.log('load history')
        })

        socket.emit('load history and users', token)

        return () => {
            socket.removeAllListeners('load history')
        }
    }, [])

    useEffect(() => {
        socket.on('not auth', hst => {
            setHistory([])
            logout()
            console.log('not auth')
        })

        return () => {
            socket.removeAllListeners('not auth')
        }
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

    useEffect(() => {
        socket.on('users online', data => {
            //console.log('users online')
            //console.log(data)
            //console.log('data online', data)
            setUsersOnline(data)

            //console.log('usersOnline', usersOnline)
        })

        return () => {
            socket.removeAllListeners('users online')
        }
    }, [])

    useEffect(() => {
        const scrollingElement = document.getElementById('card-body')
        scrollingElement.scrollTop = scrollingElement.scrollHeight
    })

    const sendHandler = () => {
        socket.emit('new message', {
            token,
            message
        })

        setMessage('')
    }

    const changeHandler = (e) => {
        setMessage(e.target.value)
    }

    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            sendHandler()
        }
    }

    return (
        <div className="container-fluid h-100">
            <div className="row justify-content-center h-100">
                <div className="col-md-4 col-xl-3 chat"><div className="card mb-sm-3 mb-md-0 contacts_card">
                    <div className="card-header">
                        <div className="input-group">
                            <input type="text" placeholder="Search..." name="" className="form-control search" />
                            <div className="input-group-prepend">
                                <span className="input-group-text search_btn"><i className="fas fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className="card-body contacts_body">
                        <ui className="contacts">
                            {
                                users && users.map((el, index) => {
                                    return (<User key={index} user={el.nickname} userId={el.id} usersOnline={usersOnline} />)
                                })
                            }
                        </ui>
                    </div>
                    <div className="card-footer"></div>
                </div></div>
                <div className="col-md-8 col-xl-6 chat">
                    <div className="card">
                        <div className="card-header msg_head">
                            <div className="d-flex bd-highlight">
                                <div className="img_cont">
                                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" alt="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"></img>
                                    <span className="online_icon"></span>
                                </div>
                                <div className="user_info">
                                    <span>шараж чат</span>
                                    <p>Сколько то Messages</p>
                                </div>
                                <div className="video_cam">
                                    <span><i className="fas fa-video"></i></span>
                                    <span><i className="fas fa-phone"></i></span>
                                </div>
                            </div>
                            <span id="action_menu_btn"><i className="fas fa-ellipsis-v"></i></span>
                            <div className="action_menu">
                                <ul>
                                    <li><i className="fas fa-user-circle"></i> View profile</li>
                                    <li><i className="fas fa-users"></i> Add to close friends</li>
                                    <li><i className="fas fa-plus"></i> Add to group</li>
                                    <li><i className="fas fa-ban"></i> Block</li>
                                </ul>
                            </div>
                        </div>
                        <div id='card-body' className="card-body msg_card_body">
                            {
                                history && history.map((el, index) => {
                                    return (<Message key={index} msg={el} index={index} />)
                                })
                            }
                        </div>
                        <div className="card-footer">
                            <div className="input-group">
                                <div className="input-group-append">
                                    <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                                </div>
                                <textarea
                                    value={message}
                                    onChange={changeHandler}
                                    onKeyDown={pressEnter}
                                    name="" className="form-control type_msg" placeholder="Type your message..."></textarea>
                                <div className="input-group-append">
                                    <span className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage