'use strict'

let db = require('../persistence/localityPersistence');

module.exports = {

    getAll: function(callback) {

        db.view('locality/toilet', (err, toilet) => {

            console.log('Toilet: %j', toilet);

            db.view('locality/water', (err, water) => {

                console.log('Water: %j', water);

                callback({
                    toilet: toilet.map((obj) => obj),
                    water: water.map((obj) => obj)
                });

            });
        });
    },

    create: function(locality, callback) {

        db.save(locality, (err, res) => {

            console.log('Create locality response: %s Errors: %s', res, err);

            callback(res.ok);
        });
    },

    update: function(id, locality, callback) {

        db.merge(id, locality, (err, res) => {

            console.log('Update locality response: %s Errors: %s', res, err);

            callback(res.ok);
        });
    }
};
