const db = require('../util/db');
const error = require('../util/error');

module.exports = (req, res) => {

    const badSessionId = () => error(res, 'Bad session id.', 401);

    if (!req.body.sessionId) {

        return badSessionId();

    }

    db.getUserBySessionId(req.body.sessionId).then(user =>

        user ? res.json({user}) : badSessionId()

    ).catch(err => error(res, err));

};
