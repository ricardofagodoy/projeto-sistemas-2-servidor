'use strict'

// Database name
let dbname = 'locality';

// Design documents
let designs = {
    '_id': '_design/locality',
    views: {
        toilet: {
            map: function(doc) {

                if (doc.sex !== undefined)
                    emit(doc._id, doc);
            }
        },
        water: {
            map: function(doc) {
                if (doc.sex === undefined)
                    emit(doc._id, doc);
            }
        }
    }
};

module.exports = require('../db')(dbname, designs);
