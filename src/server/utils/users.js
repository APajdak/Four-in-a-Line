class Users {
    constructor(){
        this.users = [];
        this.rooms = [];
        this.roomsAndUsers = [];
    }
    addUser(id, name, room, color = ''){
        let user = {id, name, room, color};
        if(this.rooms.indexOf(room) < 0){
            this.rooms.push(room);
            this.roomsAndUsers.push({room: room, users: [name]})
        }else{
            this.setRoomsAndUsers(name, room);
        }
        this.users.push(user);
        return user;
    }

    getUser(id){
        return this.users.filter( user => user.id === id)[0];
    }

    getUsersList(room){
        let users = this.users.filter( user => user.room === room );
        return users.map( user => user.name );
    }

    removeUser (id) {
        let user = this.getUser(id);
        if(user) {
            this.users = this.users.filter( user => user.id !== id);
            this.updateRooms(this.getRoom(user.room), user.name);
        }
        return user;
    }

    setRoomsAndUsers(name, room){   
        this.roomsAndUsers.map( elem => {
            if(elem.room == room){
                elem.users.push(name); 
            }
        });
    }

    updateRooms(room, user){
        let userIndex = room.users.indexOf(user);
        if (userIndex > -1){
            room.users.splice(userIndex, 1);
        }
        if(!room.users.length){
            this.rooms = this.rooms.filter(roomName => roomName !== room.room)
            this.roomsAndUsers = this.roomsAndUsers.filter( roomName => roomName.room !== room.room);
        }
    }
    getRoom (roomName){   
        return this.roomsAndUsers.filter( room => room.room == roomName)[0];
    }

}

module.exports = {Users}