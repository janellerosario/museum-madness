// const fetch = require("node-fetch");
// const { MongoClient, ObjectID } = require('mongodb');

// // const APP_TOKEN = process.env.MUSEUM_TOKEN
// const API_URL = "https://data.cityofnewyork.us/resource/fn6f-htvy.json"
// const dbConnection = 'mongodb://localhost:27017/museums';

// function getMuseum(req,res,next){
//   fetch(`${API_URL}?city=${req.body.city}`)
//   .then(r => r.json())
//   .then((result) => {
//     res.museum = result;
//     next();
//   })
//   .catch((err) => {
//     res.err = err;
//     next();
//   });
// };

// function saveFavMuseum(req,res,next) {
//   MongoClient.connect(dbConnection, (err, db) => {
//     if (err) return next(err);

//     console.log(req.body.favorite);
//     db.collection('fav_museums')
//       .insert(req.body.favorite, (insertErr, result) => {
//         if (insertErr) return next(insertErr);

//         res.savedMuseums = result;
//         db.close();
//         return next();
//       });
//     return false;
//   });
//   return false;
// };

// function getFavMuseum(req, res, next) {
//   MongoClient.connect(dbConnection, (err, db) => {
//     if (err) return next(err);

//     db.collection('fav_museums')
//       .find({})
//       .toArray((arrayError, data) => {
//         if (arrayError) return next(arrayError);

//         res.getFavMuseum = data;
//         db.close();
//         return next();
//       });
//     return false;
//   });
//   return false;
// }

// function deleteFavMuseum(req, res, next) {
//   MongoClient.connect(dbConnection, (err, db) => {
//     if (err) return next(err);

//     db.collection('fav_museums')
//       .findAndRemove({ _id: ObjectID(req.params.name) }, (removeErr, doc) => {
//         if (removeErr) return next(removeErr);

//         res.deleteFavMuseum = doc;
//         db.close();
//         return next();
//       });
//     return false;
//   });
//   return false;
// };

// module.exports = { getMuseum, saveFavMuseum, getFavMuseum, deleteFavMuseum }
