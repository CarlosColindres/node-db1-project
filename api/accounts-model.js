const db = require("../data/dbConfig.js");

module.exports = {
    getAll() {
        return db('accounts')
    },
    getById(id) {
        return db('accounts').where('id', id).first()
    },
    delete(id) {
        return db('accounts').where('id', id).del()
    },
    create(account) {
        return db('accounts').insert(account)
    },
    update(id, account) {
        return db('accounts').where('id', id).update(account)
    }
}