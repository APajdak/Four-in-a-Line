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
            this.roomList = this.roomList.filter(roomName => roomName !== room);
        }
    }

    addRoom(room, user){
        if(this.roomList.indexOf(room) > -1){
            if(this.getRoom(room)){
                this.addUserToRoom(room, user)
            }else{
                this.rooms.push(new Room(room, new User(...user)));
            }
        }else{
            return false;
        }

    }

    getRoom(roomName){
        return this.rooms.find(room => room.room == roomName);
    }

    addUserToRoom(roomName, user){
        let room = this.getRoom(roomName);
        if(room.users.length < room.max){
            room.users.push(new User(...user));
        }else{
            return false;
        }

    }

    removerUserFromRoom(userID){
        let user;
        this.rooms.filter(elem => user = elem.users.find(user => user.id == userID))
        let findRoom = this.rooms.filter(elem => elem.users.find(user => user.id == userID));
        let room = this.getRoom(findRoom[0].room);
        room.users = room.users.filter(usr => usr.id !== userID);
        if(room.users.length == 0){
            this.rooms = this.rooms.filter(rooms => rooms.room !== room.room);
            this.updateRoomList(room.room, 'delete');
        }
        return user;
    }

}

let room = new gameRooms();

module.exports = {User, Room, gameRooms}