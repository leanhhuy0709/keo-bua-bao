'use strict';

const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

const http = require("http");
const express = require("express");
var fs = require('fs');
var redis = require("redis");
const cors = require("cors");
const socketIO = require("socket.io");
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(express.json())
//012 - Búa kéo bao

var users = [
  {username: 'Admin', password: '123456'},
  {username: 'Huy', password: '123456'},
];

var rooms = [
    {name: "Default Room", user1: "Admin", p1: -1, user2: "Admin2", p2: -1},
    {name: "Room 1", user1: "Yuha", p1: -1, user2: "Emma", p2: -1},
];

function searchUser(usr, psw = undefined)
{
    var tmp = users.filter((item)=>item.username == usr && item.password == psw);
    if (psw == undefined)
        tmp = users.filter((item)=>item.username == usr);
    return tmp.length > 0;
}

app.use(cors());




const server = http.createServer(app);

const io = socketIO(server, {
    cors: {
    origin: "*",
    },
});

const PORT = process.env.PORT || 8080;//

function checkWin(p1, p2)
{
    //p1 win -> -1
    //p2 win -> 1
    //draw -> 0
    if (p1 == p2) return 0;
    if (p1 > p2)
    {
        if (p1 - p2 == 1) return -1;
        else return 1;
    }
    else
    {
        if (p2 - p1 == 1) return 1;
        else return -1;
    }
}

io.on("connection", (socket) => {
    socket.join("server");
    // Get username
    const {username} = socket.handshake.query;
    if (searchUser(username)) 
    {
        console.log(username + " connected!");
    }
    socket.on("invite", (item)=> {
        const {user1, user2, room} = item;
        console.log(user1 + " invited " + user2 + " to room " + room);
        socket.broadcast.emit("invite", item);
    })

    socket.on("accept", (item)=> {
        const {user1, user2, room} = item;
        var tmp = rooms.findIndex((item)=>item.name == room);
        if (tmp != -1)
        {
            rooms[tmp].user2 = user2;
            console.log(user2 + " acceptd invite from" + user1 + " to room " + room);
            socket.broadcast.emit("accept", item);
        }
        else 
            socket.emit("play", "Room not found");
        
    })

    socket.on('play', (item)=> {
        var {room, username, play} = item;
        var tmp = rooms.findIndex((item)=>item.name == room);
        if (tmp != -1)
        {
            if(username == rooms[tmp].user1)
            {
                if (rooms[tmp].p1 == -1)
                    rooms[tmp].p1 = play;
            }
            else if(username == rooms[tmp].user2)
            {
                if (rooms[tmp].p2 == -1)
                    rooms[tmp].p2 = play;
            }
            console.log(rooms[tmp]);
            if (rooms[tmp].p1 != -1 && rooms[tmp].p2 != -1)
            {
                switch(checkWin(rooms[tmp].p1, rooms[tmp].p2))
                {
                    case 0:
                        socket.broadcast.emit("result", {user1: rooms[tmp].user1, result1: "Draw", user2: rooms[tmp].user2, result2: "Draw"});
                        break;
                    case -1:
                        socket.broadcast.emit("result", {user1: rooms[tmp].user1, result1: "Win", user2: rooms[tmp].user2, result2: "Lose"});
                        break;
                    case 1:
                        socket.broadcast.emit("result", {user1: rooms[tmp].user1, result1: "Lose", user2: rooms[tmp].user2, result2: "Win"});
                        break;
                }
                rooms[tmp].p1 = -1;
                rooms[tmp].p2 = -1;
                console.log("Đã tính toán kết quả!");
            }
        }
    });
    // Handle disconnect
    socket.on("disconnect", () => {
        console.log(username + " disconnected!");
    });
});
//
app.post("/login", function(req, res) {
    console.log(req.body);
    if (searchUser(req.body.username, req.body.password))
    {
        console.log(req.body.username + " login complete!");
        res.send({msg: "True"});
    }
    else 
    {
        console.log(req.body.username + " login failed!");
        res.send({msg: "False"});
    }
});

app.post("/register", function(req, res) {
    
    if (!searchUser(req.body.username, req.body.password))
    {
        users.push({username: req.body.username, password: req.body.password});
        console.log(req.body.username + " register complete!");
        res.send({msg: "True"});
        
    }
    else 
    {
        console.log(req.body.username + " register failed!");
        res.send({msg: "False"});
    }
});

app.post("/createroom", function(req, res) {
    const {name, time, user1} = req.body;
    const p1 = -1, p2 = -1, user2 = "";
    var tmp = rooms.findIndex((item)=>item.name == name);
    if (tmp == -1)
    {
        rooms.push({name, time, user1, p1, user2, p2});
        res.send({msg: "True"});
    }
    else
    {
        res.send({msg: "False"});
    }
});


app.get("/users", function(req, res) {
    res.send(users);
}
)

server.listen(PORT, () => console.log(`Server listening to port ${PORT} at IP address: ${results["Wi-Fi"]}`));