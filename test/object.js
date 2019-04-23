const chai = require('chai');
// const chaiAsPromised = require("chai-as-promised");
// chai.use(chaiAsPromised);
const expect = chai.expect;

const { update } = require('../object');

describe('arraysProcessor', () => {
    describe('#update(left, right)', () => {
        it('should update', () => {
            let oldVal = {a: 'a', b: 1, c: {x: 2, y: 'y'}};
            let newVal = {a: 'b', c: 'f'};
            update(oldVal, newVal);
            expect(oldVal).deep.eql({a: 'b', b: 1, c: 'f'});

        });
        it('should update', () => {
            let oldVal = {a: 'a', b: 1, c: {x: 2, y: 'y'}};
            let newVal = {a: 'b', b: undefined, c: {x: 3}};
            update(oldVal, newVal);
            expect(oldVal).deep.eql({a: 'b', c: {x: 3, y: 'y'}});

        });
    });


});