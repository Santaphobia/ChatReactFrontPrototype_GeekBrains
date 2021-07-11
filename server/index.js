const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
});

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {

    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    socket.on("disconnect", () => {
        socket.leave(roomId);
    });
});

app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// БД

// Пользователи
// id
// name
// password
// avatar_path
// status

// Созданные чаты
// id
// name
// user_id
// is_private

// Соответствие чатов и пользователей
// chat_id
// user_id

// Сообещения
// id
// chat_id
// user_id
// text
// date_create
// is_read

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("usersdb2", "root", "123456", {
//     dialect: "mysql",
//     host: "localhost"
// });

// const db = require('./models/index');


app.get('/api/v1/chat', (req, res) => {
    res.send({
        "5": {"title": "Чат 5", "messageList": [{"id":1, "user_id":1, "text":"text1", "name": "man1" }]}
    });
});

app.get(/.*/, (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>React</title>
</head>
<body>
    <div id="root"></div>
    <script src="/build/app.js"></script>
</body>
</html>`);
});



http.listen(3000, () => {
    console.log('Server listening on 3000 port.');
});