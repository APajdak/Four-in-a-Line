const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const {Users} = require('./utils/users');

const viewPath = path.join(__dirname, '/../views')
const publicPath = path.join(__dirname, '/../views/public')
const port = 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

hbs.registerPartials(__dirname + './../views/partials');
app.set('views', viewPath);
app.set('view engine', hbs);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(publicPath));



app.get('/', (req, res)=>{
    res.render('login.hbs');
});    

app.get('/rooms/:username', (req,res)=>{
    res.render('rooms.hbs',{
        userName: req.params.username,
    });

});

app.get('/getrooms', (req, res)=>{
    res.send({
        hello: 'Siema'
    })
});

app.get('/game/:roomName', (req, res)=>{
    let room = req.body.roomName;

    res.render('game.hbs', room);
});





io.on('connection', socket =>{

    socket.on('hello', d=>{
        console.log(d);
    })

});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

 