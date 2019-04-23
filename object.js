/**
 * removes property of obj if same property in newObj is undefined
 * processes Objects recursively
 * sets properties of obj to values of same properties of newObj
 * @param {Object} obj
 * @param {Object} newObj
 */
const update = (obj, newObj) => {
    Object.keys(newObj).forEach(propName => {
        const val = newObj[propName];

        if (typeof val === 'undefined' && obj.hasOwnProperty(propName)) {
            delete obj[propName];
        } else {
            const originVal = obj[propName];

            if (typeof val === 'object' && typeof originVal === 'object') {
                update(originVal, val);
            } else if (obj.hasOwnProperty(propName)) {
                if (originVal !== val) {
                    obj[propName] = val;
                }
            } else {
                obj[propName] = val;
            }
        }
    });
};

module.exports = {
    update: update
};