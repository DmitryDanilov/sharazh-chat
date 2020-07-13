import React, { useState } from 'react'

const User = (props) => {
    //const [active, setActive] = useState(false)

    const clickActive = () => {
        props.setActiveUser(props.userId)
    }

    if (props.usersOnline && props.user) {
        let classIsOnline = props.usersOnline.some(user => user[1] === props.userId) ? 'online_icon' : 'online_icon offline'

        const activeClass = props.active ? 'active' : ''

        return (
            <li className={"li-user " + activeClass} onClick={clickActive}>
                <div className="d-flex bd-highlight">
                    <div className="img_cont">
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" alt="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"></img>
                        <span className={classIsOnline}></span>
                    </div>
                    <div className="user_info">
                        <span>{props.user}</span>
                        <p>{props.user}</p>
                    </div>
                </div>
            </li>
        )
    }
    else {
        return (
            <li className="active">
                <div className="d-flex bd-highlight">
                    <div className="img_cont">
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" alt="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"></img>
                        <span className='online_icon'></span>
                    </div>
                    <div className="user_info">
                        <span>{props.user}</span>
                        <p>{props.user}</p>
                    </div>
                </div>
            </li>
        )
    }
}

export default User