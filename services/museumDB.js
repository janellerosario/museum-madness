const fetch = require('node-fetch');
// const { MongoClient, ObjectID } = require('mongodb');

// const APP_TOKEN = process.env.MUSEUM_TOKEN
const API_URL = "https://data.cityofnewyork.us/resource/fn6f-htvy.json";
// const dbConnection = 'mongodb://localhost:27017/museums';

function getMuseum(req, res, next) {
  // fetch the url and search by term which is city
  fetch(`${API_URL}?city=${req.body.city}`)
  .then(r => r.json())
  .then((result) => {
  // pushes out the result
    res.museum = result;
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

module.exports = { getMuseum }
