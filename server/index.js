const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    signUp = require('./controllers/sign-up'),
    logIn = require('./controllers/log-in'),
    logOut = require('./controllers/log-out'),
    getSession = require('./controllers/get-session');

app.use(express.static('dist'));

app.use(bodyParser.json());

app.post('/sign-up', signUp);

app.post('/log-in', logIn);

app.post('/log-out', logOut);

app.post('/session', getSession);

app.listen(3000, () => console.log('Listening on port 3000'));
