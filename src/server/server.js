const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const {Users} = require('./utils/users');
const hbs_helper = require('./utils/hbsHelper');
const randomHash = require('./utils/randomHash');

const viewPath = path.join(__dirname, '/../views')
const publicPath = path.join(__dirname, '/../public')
const port = 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

hbs.registerPartials(viewPath + '/partials');
hbs.registerHelper('ifCond', hbs_helper);
app.set('views', viewPath);
app.set('view engine', hbs);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(publicPath));

let users = new Users;
users.addUser(1, 'Andrew', 'someRoomName', 'red');
users.addUser(2, 'John', 'someRoomName', 'black');
users.addUser(3, 'Bryan', 'someRoomName1', 'red');
users.addUser(4, 'Ann', 'someRoomName1', 'black');
users.addUser(5, 'Donald', 'someRoomName2', 'red');
users.addUser(6, 'Paris', 'someRoomName3', 'red');

app.get('/', (req, res)=>{
    res.render('login.hbs', {
        title: 'Four-in-a-line Login',
        loadBackground: true,
    });
});    

app.get('/rooms/:username', (req,res)=>{
    res.render('rooms.hbs',{
        title: 'Four-in-a-line Rooms',
        userName: req.params.username,
        loadAjax: true,
        rooms: users.roomsAndUsers
    });

});

app.get('/getrooms', (req, res)=>{
    res.send({
        users: users.roomsAndUsers
    })
});

app.get('/createRoom', (res,req) => {


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

 