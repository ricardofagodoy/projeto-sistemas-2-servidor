'use strict'

let DEFAULT_PATH = '/locality/report';

let logger = require('../logger');
let localityService = require('../services/localityService');

module.exports = function(router) {

    router.route(DEFAULT_PATH)

    // [GET] Reporting locality by id
    .get((req, res) => {
        logger.info('Reporting locality id:', req.query.id);

        localityService.report(req.query.id, function(result) {

            // Result FALSE, return error code
            if (!result)
                res.status(400);

            res.json(result);
        });
    });
};
