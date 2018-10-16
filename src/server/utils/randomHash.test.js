const expect = require('expect');
const randomHash = require('./randomHash');

describe('Random hash tests', ()=>{

    it('Should return a new hash', ()=>{
        let newHash = randomHash(12);
        expect(newHash.length).toEqual(12);
        expect(typeof newHash).toBe('string');
    })
})