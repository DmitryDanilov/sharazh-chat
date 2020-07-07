import React from 'react'

const User = (props) => {
    return (
        <li className="active">
            <div className="d-flex bd-highlight">
                <div className="img_cont">
                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img"></img>
                    <span className="online_icon"></span>
                </div>
                <div className="user_info">
                    <span>{props.user}</span>
                    <p>{props.user} </p>
                </div>
            </div>
        </li>
    )
}

export default User