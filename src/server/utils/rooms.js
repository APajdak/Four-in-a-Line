const User = require('./user');
const Room = require('./room');

class gameRooms{
    constructor(){
        this.roomList = [];
        this.rooms = [];
    }

    updateRoomList(room, option){
        if(option === 'add'){
            this.roomList.push(room);
        }else{
            this.roomList = this.roomList.filter(room => room !== room);
        }
    }

    addRoom(room, user){
        this.updateRoomList(room, 'add');
        if(this.roomList.indexOf(room) > -1){
            this.rooms.push(new Room(room, new User(...user)));
        }

    }

    getRoom(roomName){
        return this.rooms.filter(room => room.room == roomName)[0];
    }

    addUserToRoom(roomName, user){
        let room = this.getRoom(roomName);
        if(room.users.length < room.max){
            room.users.push(new User(...user));
        }else{
            return false;
        }

    }

    removerUserFromRoom(roomName, userID){
        let room = this.getRoom(roomName);
        room.users = room.users.filter(usr => usr.id !== userID);
        if(room.users.length == 0){
            this.rooms = this.rooms.filter(rooms => rooms.room !== room.room);
            this.roomList = this.roomList.filter(room => room != roomName);
        }
    }

}

module.exports = gameRooms