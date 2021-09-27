const express = require("express")
const app = express()

const http = require("http")
const server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => {
  socket.broadcast.emit("WELCOME_USER")

  socket.on("disconnect", () => {
    console.log("user disconnected")
  })
  socket.on("chat message", (msg, username) => {
    io.emit("chat message", msg, username)
  })
  socket.on("USER_IS_TYPING", (username) => {
    io.emit("USER_IS_TYPING", username)
  })
})

server.listen(3000, () => {
  console.log("listening on *:3000")
})
