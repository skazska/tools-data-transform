/**
 * sort elements of 2 arrays into 3 parts: left only, common, right only
 * mutates arrays passed params
 * @param {*[]} left
 * @param {*[]} right
 * @param {function(*, *):boolean} [compare]
 * @return {{left: *[], right: *[], intersection: {left: *, right: *}[]}}
 */
function intersection(left, right, compare) {
    if (typeof compare !== 'function') compare = (left, right) => { return left == right };
    const intersection = [];
    let l = 0;
    while (l < left.length) {
        let r = right.findIndex((rItem) => {
            return compare(left[l], rItem);
        });
        if (r >= 0) {
            intersection.push({left: left.splice(l, 1)[0], right: right.splice(r, 1)[0]});
        } else {
            l += 1;
        }
    }
    return {left: left, right: right, intersection: intersection};
}

module.exports = {
    intersection: intersection
};