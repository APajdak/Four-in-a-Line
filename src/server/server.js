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

let users = new Users;

hbs.registerPartials(viewPath + '/partials');
hbs.registerHelper('ifCond', hbs_helper);
app.set('views', viewPath);
app.set('view engine', hbs);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(publicPath));

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

app.post('/createRoom/', (req, res) => {
    let room = randomHash(15);
    users.rooms.push(room);
    res.send({
        room: room,
    })

});

let roomMid = (req, res, next)=>{
    if(users.rooms.indexOf(req.params.roomName) > -1){
        next();
    }else{
        res.redirect(301, '/');
    }
}

app.get('/game/:roomName/:userName', roomMid , (req, res)=>{
    console.log(req.params);
    res.render('game.hbs', {
        title: 'gierka',
        roomName: req.params.roomName,
        //userName: req.params.userName,
        loadGame: true,
    });
});

io.on('connection', (socket) =>{
    console.log("ehehqw");
    socket.on('disconnect', ()=>{
        console.log('socket');
    });

});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

 