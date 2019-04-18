const chai = require('chai');
// const chaiAsPromised = require("chai-as-promised");
// chai.use(chaiAsPromised);
const expect = chai.expect;

const Transition = require('../transition');

describe('arraysProcessor', () => {
    describe('Transition', () => {
        it('should call processor functions and return results', () => {
            const removed = [];
            const adjusted = [];
            const added = [];
            const results = new Transition()
                .setRemover(val => { removed.push(val); return val-1;})
                .setAdjustor((l, r) => { adjusted.push(l+r); return l+r;})
                .setCreator(val => { added.push(val); return val+1;})
                .perform([1,2],[2,3]);
            expect(removed).eql([1]);
            expect(added).eql([3]);
            expect(adjusted).eql([4]);
            expect(results).eql({removed: [0], adjusted: [4], created: [4]});
        });
    });

});