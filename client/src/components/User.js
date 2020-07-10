import React from 'react'

const User = (props) => {
    
    let classIsOnline = props.usersOnline.some(user => user[1] === props.userId) ? 'online_icon' :'online_icon offline'

    return (
        <li className="active">
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

export default User