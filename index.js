'use strict'

let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

let port = process.env.PORT || 3000;
let router = express.Router();

// Log all incoming requests
router.use((req, res, next) => {
  console.log('%s: %s', req.method, req.url);
  next();
});

// Responds on / with current time
router.get('/', function(req, res) {
    res.json({ message: new Date().getTime() });
});

// Register routes for locality model
require('./routes/locality')(router);

// Base path is /
app.use('/', router);

app.listen(port, () => console.log('Listening on port %s', port));
