require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.set("trust proxy", true);

require('./controllers/auth.controller')(app);
require('./controllers/usuario.controller')(app);
require('./controllers/url.controller')(app);
require('./controllers/home.controller')(app);

app.listen(5000);