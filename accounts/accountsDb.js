const db = require("../data/dbConfig")

module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
    getByQuery
}

function get() {
    return db('accounts');
}

function getById(id) {
    return db('accounts')
        .where({ id })
        .first();
}

function insert(account) {
    return db('accounts')
        .insert(account)
        .then(id => {
            return getById(id[0])
        });
}

function update(id, changes) {
    return db('accounts')
        .where('id', id)
        .update(changes);
}

function remove(id) {
    return db('accounts')
        .where('id', id)
        .del();
}

function getByQuery(limit, sortBy, sortDir) {
    return db('accounts')
        .limit(limit)
        .orderBy(sortBy, sortDir)
}