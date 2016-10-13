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
                    emit(doc._id, {
                        id: doc._id,
                        lat: doc.lat,
                        lng: doc.lng,
                        sex: doc.sex,
                        paid: doc.paid,
                        baby: doc.baby,
                        wheel: doc.wheel
                    });
            }
        },
        water: {
            map: function(doc) {
                if (doc.sex === undefined)
                    emit(doc._id, {
                        id: doc._id,
                        lat: doc.lat,
                        lng: doc.lng,
                        cold: doc.cold
                    });
            }
        }
    }
};

module.exports = require('../db')(dbname, designs);
