const dotEnv         = require('dotenv').config({silent: true});
const express        = require("express");
const logger         = require("morgan");
const bodyParser     = require("body-parser");
const path           = require("path");
const methodOverride = require("method-override");
const session        = require('express-session');
const cookieParser   = require('cookie-parser');
const homeRouter     = require("./routes/index.js");
const authRouter     = require("./routes/auth");
const usersRouter    = require("./routes/users");
const museumRouter   = require("./routes/museums");

const app    = express();
const SECRET = 'tacos3000';
const PORT   = process.env[2] || process.env.PORT || 3000;

// use to log what is going on in the terminal
app.use(logger('dev'));

// path for the public files to be accessed
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(methodOverride('_method'));
// this is how we read the cookies sent over from the browser
app.use(cookieParser());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SECRET
}));

app.set('view engine', 'ejs');

app.listen(PORT, () => console.warn("Server is running on port", PORT));

app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/museums', museumRouter);
