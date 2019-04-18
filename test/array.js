const chai = require('chai');
// const chaiAsPromised = require("chai-as-promised");
// chai.use(chaiAsPromised);
const expect = chai.expect;

const { intersection } = require('../array');

describe('arraysProcessor', () => {
    describe('#extractIntersection(left, right)', () => {
        it('should return {left: *[], right: *[], intersection: {left: *, right: *}[]} from left and right arrays', () => {
            expect(intersection([1,2,3,5], [3,4,5,6]))
                .deep.eql({left: [1,2], right: [4, 6], intersection: [{left: 3, right: 3},{left: 5, right: 5}]});
            expect(intersection([{id:1}, {id:2}], [2,3], (l, r)=>l.id === r))
                .deep.eql({left: [{id:1}], right: [3], intersection: [{left: {id:2}, right: 2}]});
        });
    });


});