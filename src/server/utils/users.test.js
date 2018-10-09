const expect = require('expect');
const {Users} = require('./users');

describe('Users', ()=>{

    let users;

    beforeEach(()=>{
        users = new Users()
        users.addUser(1, 'Andrew', 'someRoomName', 'red');
        users.addUser(2, 'John', 'someRoomName', 'black');
        users.addUser(3, 'Bryan', 'someRoomName1', 'red');
        users.addUser(4, 'Ann', 'someRoomName1', 'black');
        users.addUser(5, 'Donald', 'someRoomName2', 'red');
        users.addUser(6, 'Paris', 'someRoomName3', 'red');
    });


    it('should add new user', ()=>{
        let user = {id: 7, name: 'Ivonne', room: 'someRoomName3', color: 'black'}
        users.addUser(7, 'Ivonne', 'someRoomName3', 'black');
        expect(users.users.length).toBe(7);
        expect(users.users[6]).toEqual(user);
    });

    it('should find user', ()=>{
        let user = users.getUser(1);
        expect(user.id).toBe(1);
    });

    it('should remove user', ()=>{
        users.removeUser(3);
        let user = users.getUser(3);
        expect(user).toBeUndefined();
    });
    
    
    it('should not find user', ()=>{
        let user = users.getUser(8);
        expect(user).toBeUndefined();
    });
    
    it("should not find a room", ()=>{
        users.removeUser(1);
        users.removeUser(2);
        expect(users.rooms.indexOf('someRoomName')).toBeLessThan(0);
    });
})