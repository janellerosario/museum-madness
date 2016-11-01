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
  // connect to database
    getDB().then((db) => {
    console.log(req.body.favorite);
    db.collection('fav_museums')
      .insert(insertObj.favorite, (insertErr, result) => {
        if (insertErr) return next(insertErr);
  // return data
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
  // associate favorite with user
      .find({ userId: { $eq: req.session.userId } })
      .toArray((arrayError, data) => {
        if (arrayError) return next(arrayError);
  // return data
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
  // return data
        res.deleteFavMuseum = doc;
        db.close();
        return next();
      });
    return false;
  });
  return false;
};

function editMuseum(req, res, next) {
    getDB().then((db) => {
    db.collection('fav_museums')
  // find and edit entry
      .findAndModify({ _id: ObjectID(req.params.id) }, [] /* sort */,
      { $set: req.body.newmuseum }, { new: true } /* options */, (updateError, doc) => {
        if (updateError) return next(updateError);
  // return the data
        res.updated = doc;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

function saveMuseumEdit(req, res, next) {
    getDB().then((db) => {
    db.collection('fav_museums')
      .findOne({ _id: ObjectID(req.params.id) }, (findErr, newmuseum) => {
        if (findErr) return next(findErr);
  // return the data
        res.newmuseum = newmuseum;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

module.exports = { saveFavMuseum, getFavMuseum, deleteFavMuseum, editMuseum, saveMuseumEdit }
