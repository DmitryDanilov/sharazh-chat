import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Message = (props) => {
    const {userId} = useContext(AuthContext)

    const { msg } = props

    const style = (msg.userId === userId) ? "d-flex justify-content-start mb-4" : "d-flex justify-content-end mb-4"

    const formatDate = (date1) => {

        const date = new Date(date1)

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        let h = date.getHours();
        if (h < 10) h = '0' + h;

        let m = date.getMinutes();
        if (m < 10) m = '0' + m;

        return dd + '.' + mm + '.' + yy + ' ' + h + ':' + m;
    }

    const dt = formatDate(msg.dateTime)

    return (

        <div className={style}>
            <div className="img_cont_msg">
                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" alt=""></img>
            </div>
            <div className="msg_cotainer">
                <div className='nick-name'>{msg.userId}</div>
                {msg.message}
                <span className="msg_time">{dt}</span>
            </div>
        </div>
    )
}

export default Message