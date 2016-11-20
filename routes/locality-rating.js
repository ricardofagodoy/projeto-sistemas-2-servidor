'use strict'

let DEFAULT_PATH = '/locality/rating';

let logger = require('../logger');
let localityService = require('../services/localityService');

module.exports = function(router) {

    router.route(DEFAULT_PATH)

    // [GET] Rating locality by id
    .get((req, res) => {
        logger.info('Rating locality id:', req.query.id, 'with type:', req.query.type);

        localityService.rate(req.query.id, req.query.type, function(result) {

            // Result FALSE, return error code
            if (!result)
                res.status(400);

            res.json(result);
        });
    });
};
