const express = require('express');
const bodyparser = require('body-parser');
const route = require('./routes');
const app = express();
const db = require('./config/index');

// Connect db
db.connect();

app.use(
    bodyparser.urlencoded({
        extended: true,
    })
);

app.use(bodyparser.json());

route(app);

app.listen(3000);
console.log('stared');