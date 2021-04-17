/**
 * RESOURCES:
 * https://socket.io/docs/v3/emit-cheatsheet/index.html
*/

const http = require("http");
const server = http.createServer();
const io = require('socket.io')(server,{
    cors:{
    origin:'*',
    methods:'*'
}});
const PORT = 3001
io.on("connection", (socket)=>{
    console.log("New connection", socket.id)
    socket.on("message", (message)=>{
        console.log("[New] ", message, "[Sent by]",socket.id)
        // io.emit("new-message", message)
        // socket.broadcast.emit("new-message", message)
        if(message.userId){
            console.log("private message to:", message.userId)
            io.to(message.userId).emit("new-message", message.msg)
        }
        else
            socket.broadcast.emit("new-message", message.msg)
    })
})


server.listen(PORT, (err) => {
    if (err) console.error("Error in server", err);
    console.log(`App server is running and listening on port ${PORT}`);
});
