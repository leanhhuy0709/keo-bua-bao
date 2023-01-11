import io from "socket.io-client";

let socket;
const SOCKET_URL = "http://localhost:8080";//connect~

export const initiateSocket = (username) => {
    socket = io(SOCKET_URL, {
    query: { username},
    });
    console.log("Connecting to socket");
};

export const invitePlayer = ({user1, user2, room}) => {
    socket.emit('invite', {user1, user2, room});
};

export const sendMessage = (msg) => {
    socket.emit('send', msg);
    socket.once('send', (item)=>console.log(item));
};

export const createRoom = (username, tableName) => {
    socket.emit('create', {username, tableName});
};

export const sendMsg = (typ, params) => {
    socket.emit(typ, params);
};

export const getMsg = (typ, func) => {
    socket.once(typ, func);
}
