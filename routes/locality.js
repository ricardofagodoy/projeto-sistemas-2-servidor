'use strict'

let DEFAULT_PATH = '/locality';
let SPECIFIC_PATH = '/locality/:id';

let localityService = require('../services/localityService');

module.exports = function(router) {

  router.route(DEFAULT_PATH)

  // [POST] Create new locality
  .post((req, res) => {
    console.log('Create new locality: %j', req.body);
    res.json(req.body);
  })

  // [GET] Retrieve all localities
  .get((req, res) => {
    res.end('Retrieve all localities');
  });


  router.route(SPECIFIC_PATH)

   // [GET + id] Retrieve specific locality
  .get((req, res) => {
    res.end('Retrieve locality ' + req.params.id);
  })

  // [PUT + id] Update specific locality
  .put((req, res) => {
    res.end('Update locality ' + req.params.id);
  })

   // [DELETE + id] Delete specific locality
  .delete((req, res) => {
    res.end('Delete locality ' + req.params.id);
  });
};
