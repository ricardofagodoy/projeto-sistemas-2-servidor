let connection = new(require('cradle').Connection)();
//cradle.setup({ host: '127.0.0.1', port: 5984 });

let logger = require('./logger');

// Create database and populate design documents
module.exports = function(dbname, designs) {

    let db = connection.database(dbname);

    db.exists(function(err, exists) {

        if (err)
            logger.error('Database error: %s', err);
        else if (exists)
            logger.info('Database locality already exists!');
        else {

            logger.info('Database does not exists. Creating...');

            db.create(function(err, response) {

                if (err)
                    logger.error('Error creating database: %s', err);
                else {
                    /* populate design documents */
                    db.save(designs, function(err) {
                        if (err)
                            logger.error('Errror creating design documents: %s', err);
                        else
                            logger.info('Success creating design documents: %j', designs);
                    });
                }
            });
        }
    });

    return db;
};
