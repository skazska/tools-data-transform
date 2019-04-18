const Transition = require('./transition');

const update = (obj, newObj) => {
    const set = (key, val) => {
        if (val && typeof val === 'object') {
            if (!obj[key]) {
                if (Array.isArray(val)) {
                    obj[key] = [];
                } else {
                    obj[key] = {};
                }
            }
            update(obj[key], val);
        } else {
            obj[key] = newObj[key];
        }
    };

    new Transition((oldKey, newKey) => oldKey === newKey)
        .setRemover(oldKey => { delete obj[oldKey]; })
        .setAdjustor((oldKey, newKey) => { set(oldKey, newObj[newKey]); })
        .setCreator(newKey => { set(newKey, newObj[newKey]); })
        .perform(Object.keys(obj), Object.keys(newObj));
};

module.exports = {
    update: update
};