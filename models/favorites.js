const { ObjectID } = require('mongodb');
const { getDB }    = require('../lib/dbConnect.js');

function saveFavMuseum(req,res,next) {
  // creating an empty object for the insertObj
  const insertObj = {};

  // copying all of req.body into insertObj
  for(key in req.body) {
    insertObj[key] = req.body[key];
  }
  // Adding userId to insertObj
  insertObj.favorite.userId = req.session.userId;
    getDB().then((db) => {
    console.log(req.body.favorite);
    db.collection('fav_museums')
      .insert(insertObj.favorite, (insertErr, result) => {
        if (insertErr) return next(insertErr);
        res.savedMuseums = result;
        db.close();
        return next();
      });
    return false;
  });
  return false;
};

function getFavMuseum(req, res, next) {
getDB().then((db) => {
    db.collection('fav_museums')
      .find({ userId: { $eq: req.session.userId } })
      .toArray((arrayError, data) => {
        if (arrayError) return next(arrayError);
        res.getFavMuseum = data;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

function deleteFavMuseum(req, res, next) {
    getDB().then((db) => {
    db.collection('fav_museums')
      .findAndRemove({ _id: ObjectID(req.params.name) }, (removeErr, doc) => {
        if (removeErr) return next(removeErr);
        res.deleteFavMuseum = doc;
        db.close();
        return next();
      });
    return false;
  });
  return false;
};

module.exports = { saveFavMuseum, getFavMuseum, deleteFavMuseum }
