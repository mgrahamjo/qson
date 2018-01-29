const db = require('../util/db');
const error = require('../util/error');

module.exports = (req, res) => {

    if (!req.body.sessionId) {

        return error(res, 'No session id provided.', 400);

    }

    db.deleteSession(req.body.sessionId)
        .then(() => res.send())
        .catch(err => error(res, err));

};
