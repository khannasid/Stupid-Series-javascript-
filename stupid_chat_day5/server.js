// we use nodemon to make automatic detection of any changes
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

app.use(express.static(__dirname));// inorder to tell express we are using a static file.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const Message = mongoose.model('Message',{
    name: String, 
    message: String,
    time: String
});



// mongoose.connection.once("open",() => console.log("Connected"))
// .on("error", error =>{
    //     console.log("Your error", error);
    // });
    
    // Routes 
    // GET Requests
app.get('/messages', (req,res) =>{
    Message.find({},(err, messages)=>{
        res.set('Access-Control-Allow-Origin','*');
        res.send(messages);
    })
})
//POST Requests
app.post('/messages', (req, res) =>{
    var message = new Message(req.body);
    message.save((err) =>{
        if(err)sendStatus(500);
        else{
            res.set('Access-Control-Allow-Origin','*');
            io.emit('message',req.body);
            res.sendStatus(200);
        }
    })
})

// Creating a Socket.io Connection
io.on('connection', () =>{
    console.log('a user is connected');
})

mongoose.set('strictQuery',false);
mongoose.connect("mongodb://localhost:27017", {useNewUrlParser: true});

const server = http.listen(3000, () =>{
    console.log("Server is set!!", server.address().port);
})