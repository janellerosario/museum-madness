require('dotenv').config();
const express = require("express");
const logger  = require("morgan");
const bodyParser = require("body-parser")
const path  = require("path");
const methodOverride = require("method-override");
const dbService = require("./models/museumDB");
const homeRouter = require("./routes/index.js");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

const app = express();
const PORT = process.env[2] || process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.listen(PORT, () => console.warn("Server is running on port", PORT));

app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/users',usersRouter);

// app.get('/', dbService.getFavMuseum, (req, res) => {
//   res.render('index', {
//     museum: res.museum || [],
//     favorites: res.getFavMuseum || [],
//   });
// });

// app.post("/search", dbService.getFavMuseum, dbService.getMuseum, (req, res) => {
//   res.render('index', {
//     museum: res.museum,
//     favorites: res.getFavMuseum,
//   });
//   // res.json(res.museum);
// });

// app.post("/favorites", dbService.saveFavMuseum, (req, res) => {
//   res.redirect("/")
// });

// app.delete("/favorites/:name", dbService.deleteFavMuseum, (req, res) => {
//   res.redirect("/")
// });
