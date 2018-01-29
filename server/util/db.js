const sqlite = require('sqlite'),
    escape = require('./escape'),
    bcrypt = require('bcrypt'),
    crypto = require('crypto');

let db;

sqlite.open('../qson-db/qson.db').then(_db => {

    db = _db;

}).catch(err => console.error(err));

module.exports = {

    getUserByEmail: email => db.get(`
        SELECT * FROM user WHERE email = '${email}';
    `),

    getUserBySessionId: sessionId => db.get(`
        SELECT * FROM user WHERE session_id = '${sessionId}';
    `),
    
    // returns userId
    createUser: data => bcrypt.hash(data.password, 10).then(hash => new Promise((resolve, reject) => {

        crypto.randomBytes(16, (err, buffer) => {

            if (err) {

                return reject(err);

            }

            db.run(`
                INSERT INTO user (name, email, hash, api_key, created_date)
                VALUES (
                    "${escape(data.name)}",
                    "${escape(data.email)}",
                    "${escape(hash)}",
                    "${encodeURIComponent(buffer.toString('hex'))}",
                    "${new Date().toJSON()}"
                );
            `)
            .then(result => resolve(result.stmt.lastID))
            .catch(reject);

        });

    })),

    // returns sessionId
    createSession: userId => new Promise((resolve, reject) => crypto.randomBytes(12, (err, buffer) => {

        if (err) {

            return reject(err);

        }

        const sessionId = encodeURIComponent(buffer.toString('hex'));

        db.run(`
            UPDATE user
            SET session_id = '${sessionId}'
            WHERE id = '${userId}';
        `)
        .then(() => resolve(sessionId))
        .catch(reject);
    
    })),

    checkPassword: (password, hash) => 
        bcrypt.compare(password, hash)
            .then(success => success ? Promise.resolve() : Promise.reject()),

    deleteSession: sessionId => db.run(`
        UPDATE user
        SET session_id = null
        WHERE session_id = '${sessionId}';
    `)

};
