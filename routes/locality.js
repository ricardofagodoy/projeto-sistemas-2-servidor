'use strict'

let DEFAULT_PATH = '/locality';
let SPECIFIC_PATH = '/locality/:id';

let logger = require('../logger');
let localityService = require('../services/localityService');

module.exports = function(router) {

    require('./locality-rating')(router);
    require('./locality-report')(router);

    router.route(DEFAULT_PATH)

    // [POST] Create new locality
    .post((req, res) => {
        logger.info('Create new locality:', req.body);

        localityService.create(req.body, function(result) {

            // Result FALSE, return error code
            if (!result)
                res.status(400);

            res.json(result);
        });
    })

    // [GET] Retrieve all localities
    .get((req, res) => {
        logger.info('Retrieve all localities');

        localityService.getAll(function(result) {
            res.json(result);
        });
    });


    router.route(SPECIFIC_PATH)

    // [PUT + id] Update specific locality
    .put((req, res) => {
        logger.info('Update locality id:', req.params.id, 'body:', req.body);

        localityService.update(req.params.id, req.body, function(result) {

            // Result FALSE, return error code
            if (!result)
                res.status(400);

            res.json(result);
        });
    })

    // [GET + id] Retrieve specific locality
    .get((req, res) => {
        res.end('Retrieve locality ' + req.params.id + ' not implemented!');
    })

    // [DELETE + id] Delete specific locality
    .delete((req, res) => {
        res.end('Delete locality ' + req.params.id + ' not implemented!');
    });
};
