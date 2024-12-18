const express = require('express');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');
const app = express();

const rooms = new Set();
var roomUser = [];
app.use(express.static(path.join(__dirname, '../build')));
app.use(cors());
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

const { addUser, removeUser, getUser, getUsersInRoom, addWorth, reset } = require('./users.js');
const { getuid } = require('process');

//Listening Port
const server = app.listen(3000, () => {
    console.log("server started at port 3000 ");
})

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Function to store timers and clear them when needed
const activeTimers = {};

// Function to be executed when the timer completes
const timerCallback = (room, id) => {
    
    const user = getUser(id);
    if (user) {
        io.in(user.room).emit("enable", "false");
        roomUser = getUsersInRoom(user.room);
        roomUser.forEach((e) => {
            if (e.worth === "waiting") {
                addWorth(e.id, "?");
                io.in(user.room).emit("selected", "?");
                io.in(user.room).emit("preach", roomUser);
            }
        });
    }
    delete activeTimers[room];
};

// Connection to server

io.on("connection", function (socket) {
    //Join into the room

    socket.on('validateRoom',(roomID,callback)=>{
        if (rooms.has(roomID)) {
            callback(false);
        } else {
            callback(true);
        }
    })

    socket.on('join', ({ name, room, roomOwner, cardVale }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room, roomOwner, cardVale });
        if (error) return callback(error);
        
        rooms.add(room);
        socket.join(room);

        io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUsersInRoom(user.room),
        });
    });

    //Story Description

    socket.on("story", function (data) {
        const user = getUser(socket.id);
        if (user) {
            io.in(user.room).emit("story", data);

        }
    })

    socket.on("clearStory", function () {
        const user = getUser(socket.id);
        if (user) {
            io.in(user.room).emit("clearStory");

        }
    })

    socket.on("clearJiraLink", function() {
        const user = getUser(socket.id);
        if (user) {
            io.in(user.room).emit("clearJiraLink");
        }
    })

    // Polling
    socket.on("poll", function (data) {
        const user = getUser(socket.id);
        if (user) {
            const room = user.room;

            if (data === 'true') {
             
                io.in(room).emit("poll", data);

                // Check if there is an active timer for the room and clear it
                if (activeTimers[room]) {
                    clearTimeout(activeTimers[room]);
                   
                }

                // Set a new 90-second timer
                activeTimers[room] = setTimeout(() => timerCallback(room, socket.id), 60 * 1000);
            } else if (data === 'false') {
                

                // Check if there is an active timer for the room and clear it
                if (activeTimers[room]) {
                    clearTimeout(activeTimers[room]);
                  
                }

                io.in(room).emit("poll", data);
            }
        }
    });

    //Enable Polling
    socket.on("enable", function (data) {
        const user = getUser(socket.id);
        if (user) {
            io.in(user.room).emit("enable", data);
        }
    })

    //Jira_link
    socket.on("jira", function (data) {
        const user = getUser(socket.id);
        if (user) {
            io.in(user.room).emit("jira", data);
        }
    })


    // Chat
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    //test


    socket.on('disconnect', () => {
        const user = getUser(socket.id)
        removeUser(socket.id);

        // Emit updated room data when a user leaves
        if (user) {

            const UsersInRoom = getUsersInRoom(user.room);

            io.to(user.room).emit("roomData", {
                room: user.room,
                users: UsersInRoom,
            });

            if (UsersInRoom.length === 0){
                
                rooms.delete(user.room);
            }
        }
        
        io.sockets.emit("playerdet", roomUser.length);
    });

    //Card
    socket.on("selected", function (data) {
        addWorth(socket.id, data);
        console.log("the thing is " + data);
        const user = getUser(socket.id);
        roomUser = getUsersInRoom(user.room);
        console.log(roomUser);
        io.in(user.room).emit("selected", data);
        io.in(user.room).emit("preach", roomUser);
    })
    socket.on("preach", function (data) {
        if (data === 'reset') {
            const user = getUser(socket.id);
            reset(user.room)
            roomUser = getUsersInRoom(user.room);
           
            io.in(user.room).emit("preach", 'reset');
            io.in(user.room).emit("preach", roomUser);
        }
    })

    socket.on('getusers', ({ name, room }, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        callback();
    });

});
