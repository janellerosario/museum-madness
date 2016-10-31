const router = require('express').Router();
const { authenticate } = require('../lib/auth');
const { getMuseum } = require('../services/museumDB');
const { getFavMuseum,
        saveFavMuseum,
        deleteFavMuseum,
        editMuseum,
        saveMuseumEdit } = require('../models/favorites');

router.get('/', authenticate, getFavMuseum, (req, res) => {
  res.render('museums/index', {
    user: res.user,
    museum: res.museum || [],
    favorites: res.getFavMuseum || [],
  });
});

router.post('/search', authenticate, getMuseum, getFavMuseum, (req, res) => {
  res.render('museums/index', {
    user: res.user,
    museum: res.museum || [],
    favorites: res.getFavMuseum || [],
  });
  // res.json(res.museum);
});

router.get('/edit/:id', saveMuseumEdit, (req,res) => {
  res.render('museums/edit', { newmuseum: res.newmuseum });
});

router.put('/edit/:id', editMuseum, (req, res) => {
  res.redirect('/museums');
});

router.post('/favorites', saveFavMuseum, (req, res) => {
  res.redirect('/museums')
});

router.delete('/favorites/:name', deleteFavMuseum, (req, res) => {
  res.redirect('/museums')
});

module.exports = router;
