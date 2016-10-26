'use strict'

let db = require('../persistence/localityPersistence');
let logger = require('../logger');

module.exports = {

    getAll: function(callback) {

        db.view('locality/toilet', (err, toilet) => {

            logger.info({'Toilet': toilet});

            db.view('locality/water', (err, water) => {

                logger.info({'Water': water});

                // Initialize if undefined
                if (toilet === undefined || water === undefined)
                  toilet = water = [];

                callback({
                    toilet: toilet.map((obj) => obj),
                    water: water.map((obj) => obj)
                });

            });
        });
    },

    create: function(locality, callback) {

        // Validate fields before saving
        if (locality == undefined || !locality.lat || !locality.lng) {
            logger.error('Missing fields to create new locality', locality);
            return callback(false);
        }

        db.save(locality, (err, res) => {
            logger.info('Create locality - response:', res, 'error:', err);
            callback(!err ? true : false);
        });
    },

    update: function(id, locality, callback) {

        db.merge(id, locality, (err, res) => {
            logger.info('Create locality - response:', res, 'error:', err);
            callback(!err ? true : false);
        });
    }
};
