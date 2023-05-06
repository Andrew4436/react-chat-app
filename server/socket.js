const io = require("socket.io")(4040, {
    cors: {
        origin: '*'
    }
})

io.on("connection", socket => {
    socket.on('send-message', (message, user) => {
        socket.broadcast.emit('receive-message', message, user)
    })
});
