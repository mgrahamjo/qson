const db = require('../util/db');
const error = require('../util/error');

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

module.exports = (req, res) => {

    if (!req.body.password || req.body.password.length < 6) {

        return error(res, 'Password must be at least 6 characters.', 400);

    }

    if (!req.body.email || !req.body.email.match(emailRegex)) {

        return error(res, 'Please use a valid email address.', 400);

    }

    db.getUserByEmail(req.body.email).then(row =>

        row ? error(res, 'That email is already in use.', 400)

            : db.createUser(req.body)
                .then(db.createSession)
                .then(sessionId => res.json({sessionId}))

    ).catch(err => error(res, err));

};
