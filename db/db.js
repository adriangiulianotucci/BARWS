const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db/db.json')
const db = low(adapter)

const database = {
    getFreeOrders : function(idLocal) {
        return (db.get('orders')
        .find({ local: idLocal , status: 'free'})
        .value())
    },
    findLocal : function (idLocal) {
        return (db.get('locals')
        .find({id : idLocal})
        .value()
        )
    },
    createLocal : function (idLocal, name) {
        if (!database.findLocal(idLocal)) {
            db.get('locals')
            .push({id : idLocal , name : name})
            .write()
            return 'Local created'
        } else {
            return 'Id in use'
        }
    },
    createOrder : function () {
        
    },
    getLastId : function (table){

    },
    takeOrder: function (id) {
        db.get('orders')
        .find({id : id})
        .assign({status : 'taken'})
        .write()
    },
    freeOrder: function (id) {
        db.get('orders')
        .find({id : id})
        .assign({status : 'free'})
        .write()
    } 
}

module.exports = database
