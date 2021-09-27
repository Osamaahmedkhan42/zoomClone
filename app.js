//imports
const express =require('express');
const app = express();
const cors = require('cors')
app.use(cors({
  origin:'https://drive.google.com'
}))
const http = require('http');
//const server = require('http').Server(app) //make server to allow use with socket IO
const server = http.createServer(app);
//const io = require('socket.io')(server);
const {Server} = require("socket.io");
const io = new Server(server)
const {v4:uuidV4}=require('uuid')
//expresswithpeers
const {ExpressPeerServer}=require('peer');
const peerserver = ExpressPeerServer(server,{
    debug:true
})
//setting up express server
app.set('view engine','ejs');
app.use(express.static('public'));
//peerExpress mware
app.use('/peerjs',peerserver)
//routes
app.get('/os',(req,res)=>{
  // res.redirect(`/${uuidV4()}`)
   res.redirect('/friends')

})
app.get('/:room',(req,res)=>{
    res.render('room',{roomID:req.params.room})
})
//socket IO routes

io.on('connection',socket=>{
    //test
    console.log('socket is working')
    socket.on('join-room',(roomID,userID,uName)=>{
        //test
        console.log(uName+' is going to join a room')
        socket.join(roomID);
        console.log('room joined '+roomID);
        //
        console.log('user named  joined the room')
        socket.broadcast.to(roomID).emit('user-connected',userID,uName)
    })
    //closing
    socket.on("disconnect", () => {
      console.log(socket.id +"discconected"); // undefined
      //socket.broadcast.emit('')
    
    });
})


//closing the connection
io.on('end', function (){
  socket.disconnect(0);
});
//server side code is ok

//msg code
// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       console.log('message: ' + msg);
//     });
//   });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg,userName,rid) => {
     // console.log(rid+"by msg part working");
     //socket.join(rid);
     console.log("in middle")
     io.to(rid).emit('chat message', msg,userName);
      //io.emit('chat message', msg,userName);
      
    });
  });
//just


server.listen( process.env.PORT||3030);