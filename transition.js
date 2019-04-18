const { intersection } = require('./array');

/**
 * @class represents []->[] transition processor
 */
class Transition {
    /**
     *
     * @param {function(*, *):boolean} comparator
     */
    constructor (comparator) {
        this.comparator = comparator || ((left, right) => { return left == right });
    }

    /**
     * register processor function for element representing entity in 'from' state, which not presented in 'to' (to be removed)
     * @param {function(*):*} processor
     * @return {Transition}
     */
    setRemover (processor) {
        this.remover = processor;
        return this;
    }

    /**
     * register processor function for element representing entity in 'to' state, which not presented in 'from' (to be created)
     * @param {function(*):*} processor
     * @return {Transition}
     */
    setCreator (processor) {
        this.creator = processor;
        return this;
    }

    /**
     * register processor function for element representing entity presented in both states (to be adjusted)
     * @param {function(*, *):*} processor
     * @return {Transition}
     */
    setAdjustor (processor) {
        this.adjustor = processor;
        return this;
    }

    /**
     * process transferring
     * @param {*[]} from
     * @param {*[]} to
     * @return {{removed: *[], adjusted: *[], created: *[]}}
     */
    perform (from, to) {
        const left = Object.keys(from).map(i => parseInt(i, 10));
        const right = Object.keys(to).map(i => parseInt(i, 10));
        const compare = (l, r) => {
            return this.comparator(from[l], to[r]);
        };

        const {left: toRemove, right: toCreate, intersection: toAdjust} = intersection(left, right, compare);

        const result = {};
        if (this.remover) result.removed = toRemove.map(i => this.remover(from[i]));
        if (this.adjustor) result.adjusted = toAdjust.map(({left:l, right:r}) => this.adjustor(from[l], to[r]));
        if (this.creator) result.created = toCreate.map(i => this.creator(to[i]));

        return result;
    }
}

module.exports = Transition;