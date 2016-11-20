'use strict'

let db = require('../persistence/localityPersistence');
let logger = require('../logger');

module.exports = {

        getAll: function(callback) {

            db.view('locality/toilet', (err, toilet) => {

                logger.info({
                    'Toilet': toilet
                });

                db.view('locality/water', (err, water) => {

                    logger.info({
                        'Water': water
                    });

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

        report: function(id, callback) {

            let self = this;

            db.get(id, function(err, doc) {

                        if (err) {
                            logger.error('Locality not found with id:', id);
                            return callback(false);
                        }

                        if (doc.reports === undefined)
                            doc.reports = 0;

                        doc.reports++;

                        if (doc.reports > 5)
                            logger.info('Locality', id, 'reported more than 5 times!');

                        self.update(id, doc, function(succ) {
                            callback(succ);
                        });
                    });
                },

                rate: function(id, type, callback) {

                    let self = this;

                    db.get(id, function(err, doc) {

                        if (err) {
                            logger.error('Locality not found with id:', id);
                            return callback(false);
                        }

                        if (doc.rating === undefined)
                            doc.rating = 0;

                        // If it's good or bad rating
                        let ratingStatus = type > 0 ? 1 : -1;

                        doc.rating += ratingStatus;

                        self.update(id, doc, function(succ) {
                            callback(succ);
                        });
                    });
                },

                create: function(locality, callback) {

                    // Validate fields before saving
                    if (locality == undefined || !locality.location.latitude || !locality.location.longitude) {
                        logger.error('Missing fields to create new locality', locality);
                        return callback(false);
                    }

                    // Id should not exist, will be generated
                    delete locality._id;

                    // Rating starts with zero
                    locality.rating = 0;

                    db.save(locality, (err, res) => {
                        logger.info('Create locality - response:', res, 'error:', err);
                        callback(!err ? true : false);
                    });
                },

                update: function(id, locality, callback) {

                    db.merge(id, locality, (err, res) => {
                        logger.info('Updated locality - response:', res, 'error:', err);
                        callback(!err ? true : false);
                    });
                }
        };
