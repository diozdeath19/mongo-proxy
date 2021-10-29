const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');

require('express-async-errors');


const app = express();

app.enable('trust proxy');
app.use(cookieParser());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/execute');

app.use(middlewares.success);
app.use(middlewares.error);

module.exports = app;
