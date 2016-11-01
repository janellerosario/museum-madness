const router             = require('express').Router();
const { authenticate }   = require('../lib/auth');
const { getMuseum }      = require('../services/museumDB');
const { getFavMuseum,
        saveFavMuseum,
        deleteFavMuseum,
        editMuseum,
        saveMuseumEdit } = require('../models/favorites');

// set up route for main page
router.get('/', authenticate, getFavMuseum, (req, res) => {
  res.render('museums/index', {
    user: res.user,
    museum: res.museum || [],
    favorites: res.getFavMuseum || [],
  });
});

// set up search area
router.post('/search', authenticate, getMuseum, getFavMuseum, (req, res) => {
  res.render('museums/index', {
    user: res.user,
    museum: res.museum || [],
    favorites: res.getFavMuseum || [],
  });
  // res.json(res.museum);
});

// getting museum to edit
router.get('/edit/:id', saveMuseumEdit, (req,res) => {
  res.render('museums/edit', { newmuseum: res.newmuseum });
});

// putting (posting) edits to museum
router.put('/edit/:id', editMuseum, (req, res) => {
  res.redirect('/museums');
});

// saving to visited museums area
router.post('/favorites', saveFavMuseum, (req, res) => {
  res.redirect('/museums')
});

// deleting from the visited museums area
router.delete('/favorites/:name', deleteFavMuseum, (req, res) => {
  res.redirect('/museums')
});

module.exports = router;
