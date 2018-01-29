const db = require('../util/db');
const error = require('../util/error');

module.exports = (req, res) => {

    const badCredentials = err => error(res, err || 'Bad credentials.', 401);

    if (!req.body.password || req.body.password.length < 6 || !req.body.email) {

        return badCredentials();

    }

    db.getUserByEmail(req.body.email).then(user =>

        user ? db.checkPassword(req.body.password, user.hash)
                .then(() => db.createSession(user.id))
                .then(sessionId => res.json({sessionId}))
                .catch(badCredentials)

            : badCredentials()

    ).catch(err => error(res, err));

};
