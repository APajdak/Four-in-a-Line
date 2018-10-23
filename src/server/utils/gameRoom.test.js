const expect = require('expect');
const {Users, Room, gameRooms} = require('./gameRooms');

describe('Users', ()=>{

    let room;

    beforeEach(()=>{
        room = new gameRooms();
        room.updateRoomList('someRoomName1', 'add')
        room.updateRoomList('someRoomName2', 'add')
        room.updateRoomList('someRoomName3', 'add')
        room.updateRoomList('someRoomName4', 'add')
        room.addRoom('someRoomName1', ['1', 'Andrew', 'red']);
        room.addRoom('someRoomName1', ['2', 'John', 'yellow']);
        room.addRoom('someRoomName2', ['3', 'Ann', 'red']);
        room.addRoom('someRoomName3', ['4', 'Donald', 'red']);
        room.addRoom('someRoomName2', ['5', 'Paris', 'yellow']);

    });


    it('should add new user', ()=>{
        let roomWithNewUser = room.getRoom('someRoomName3');
        let roomLenghtBeforeNewUser = roomWithNewUser.users.length;
        room.addRoom('someRoomName3', ['6', 'Mary', 'yellow']);
        expect(roomWithNewUser.users.length).toEqual(roomLenghtBeforeNewUser + 1);
    });
    it('should not add new user', ()=>{
        let roomWithNewUser = room.getRoom('someRoomName1');
        let roomLenghtBeforeNewUser = roomWithNewUser.users.length;
        room.addRoom('someRoomName1', ['6', 'Mary', 'yellow']);
        expect(roomWithNewUser.users.length).toEqual(roomLenghtBeforeNewUser);
    });

    it('should find room', ()=>{
        let foundRoom = room.getRoom('someRoomName2');
        expect(foundRoom).toBeTruthy();
    });

    it('should not find room', ()=>{
        let foundRoom = room.getRoom('someNotExistingRoomName');
        expect(foundRoom).toBeUndefined();
    });

    it('should remove user', ()=>{
        let roomListSize = room.roomList.length;
        room.removerUserFromRoom('4');
        expect(room.roomList.length).toBe(roomListSize-1)
    });
})