const express=require("express")
const app=express()
const httpServer=require("http")
const http=httpServer.Server(app)
const socket=require("socket.io")
const io=socket(http)
const bp=require("body-parser")
const mongoose=require("mongoose")
const userRoutes=require("./routes/UserRoutes")



app.use(bp.json())
app.use("/User",userRoutes)



app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/ChatApp.html')
})
var count=0;
io.on('connection',(socket)=>{

    var room="abc123"
    //assuming that the client page once rendered,knows what page it wants to join.
    //hardcoding one room assuming clients only join this room.

    socket.on('room',function(room){
        if(count<2){
            count+=1;
            console.log(count)
            socket.join(room)
            }
            else{
                console.log("There are already 2 users in this room!")
                socket.emit('limit-exceeded','Room is full.Please select another room!')
            }      
    });
    
    
    socket.emit('admin-message', 'Hello Users! You can start chatting here!');//broadcasting admin message to room!
    console.log("user is connected")
    
    socket.on('setUsername',(data)=>{    
        socket.emit("userSet",{username:data,msg:"start chatting !!"})   
    })
    socket.on('message',(data)=>{
    
        io.sockets.in(room).emit('setMessage',data)//emitting message to just the clients in that room
    })

})

mongoose.connect("mongodb://localhost:27017/chatApp").then((res)=>console.log("Connected to DB!")).catch((err)=> console.log(err));

http.listen(3001,()=>{
    console.log("socket server is running....")
})