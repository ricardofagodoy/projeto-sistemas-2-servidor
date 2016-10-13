'use strict'

let DEFAULT_PATH = '/locality';
let SPECIFIC_PATH = '/locality/:id';

let localityService = require('../services/localityService');

module.exports = function(router) {

    router.route(DEFAULT_PATH)

    // [POST] Create new locality
    .post((req, res) => {
        console.log('Create new locality: %j', req.body);

        localityService.create(req.body, function(result) {
            res.json(result);
        });
    })

    // [GET] Retrieve all localities
    .get((req, res) => {
        console.log('Retrieve all localities');

        localityService.getAll(function(result) {
            res.json(result);
        });
    });


    router.route(SPECIFIC_PATH)

    // [PUT + id] Update specific locality
    .put((req, res) => {
        console.log('Update locality %s: %j', req.params.id, req.body);

        localityService.update(req.params.id, req.body, function(result) {
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
