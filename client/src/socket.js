import socketIOClient from "socket.io-client"

const serv = "http://192.168.36.21:5000/"
//const serv = "http://localhost:5000/"
const socket = socketIOClient(serv);

export default socket