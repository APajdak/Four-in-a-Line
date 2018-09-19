const path = require('path');
const http = require('http');
const express = require('express');
const session = require('express-session');
const socketIO = require('socket.io');
const hbs = require('hbs');

const publicPath = path.join(__dirname, '../public')
const port = 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', hbs);
app.use(express.static(publicPath));


app.get('/', (req, res)=>{
    res.render('login.hbs');

});

app.get('/rooms/:username', (req,res)=>{
    res.render('rooms.hbs');

});

app.get('/game/:roomName', (req, res)=>{
    res.render('game.hbs');

    io.on('connection', (socket)=>{
        socket.on("hello", data=>{
            console.log(data);
        })
    socket.on('disconnect', ()=>{
            console.log("bye bye");
        })
        
    })
});



    
    
  


server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
  })

 