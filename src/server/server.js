const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const {Users, Room, gameRooms} = require('./utils/gameRooms');
const {stringValidation} = require('./utils/validation');
const hbs_helper = require('./utils/hbsHelper');
const randomHash = require('./utils/randomHash');

const viewPath = path.join(__dirname, '/../views')
const publicPath = path.join(__dirname, '/../public')
const port = 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

let room = new gameRooms();

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
        rooms: room.rooms
    });

}); 

app.get('/getrooms', (req, res)=>{
    res.send({
        rooms: room.rooms
    })
});

app.post('/createRoom/', (req, res) => {
    let roomName = randomHash(15);
    room.updateRoomList(roomName, 'add');
    res.send({
        room: roomName,
    })

});

let roomMid = (req, res, next)=>{
    if(room.roomList.indexOf(req.params.roomName) > -1){
        next();
    }else{
        res.redirect(301, '/');
    }
}

app.get('/game/:roomName/:userName', roomMid , (req, res)=>{
    res.render('game.hbs', {
        title: 'gierka',
        roomName: req.params.roomName,
        userName: req.params.userName,
        loadGame: true,
    });
});

io.on('connection', (socket) =>{

    socket.on('join', data=>{
        room.addRoom(data.room, [socket.id, data.user ,data.color]);
        socket.join(data.room);
        console.log(room.getRoom(data.room));
    })

    socket.on('message', data => {
        if(!stringValidation(data.message)) 
            return false;
            
        io.in(data.room).emit('message',{
            from: data.user,
            msg: data.message,
            color: data.color,
        })
    })
    
    socket.on('disconnect', ()=>{
        let user = room.removerUserFromRoom(socket.id);
        if(user){
            console.log(room.roomList);
            console.log(room.rooms);
        }
    });

});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

 