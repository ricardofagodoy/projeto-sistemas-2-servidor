let connection = new(require('cradle').Connection)();
//cradle.setup({ host: '127.0.0.1', port: 5984 });


// Create database and populate design documents
module.exports = function(dbname, designs) {

    let db = connection.database(dbname);

    db.exists(function(err, exists) {

        if (err)
            console.log('Database error: %s', err);
        else if (exists)
            console.log('Database locality already exists!');
        else {

            console.log('Database does not exists. Creating...');

            db.create(function(err, response) {

                if (err)
                    console.log('Error creating database: %s', err);
                else {
                    /* populate design documents */
                    db.save(designs, function(err) {
                        if (err)
                            console.log('Errror creating design documents: %s', err);
                        else
                            console.log('Success creating design documents: %j', designs);
                    });
                }
            });
        }
    });

    return db;
};
