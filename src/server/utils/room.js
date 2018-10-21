class Room{
    constructor(room, user){
        this.room = room;
        this.users = [user];
        this.turn = '';
        this.max = 2;
    }
}

module.exports = Room;