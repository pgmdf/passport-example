const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {

  // req.user // passport makes this available 
  res.render('index', { user: req.user });

});

// DRY !!
// this is a middleware
let loggedInUser = (req, res, next) => {
  // req.user // passport makes this available 
  if (req.user) {
    next()
  } else {
    req.flash('message', 'You have to be logged in to view this page')
    req.flash('message', 'this is Message 2')
    res.redirect('/login?redirectBackTo=' + req.path)
    //res.send('test')
  }
}

let userIsAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next()
  } else {
    res.send('you not admin')
  }
}

// here user needs to be logged in
router.get('/books', loggedInUser, (req, res, next) => {

  res.send('here be books')
});

// here user needs to be logged in && be an admin
router.get('/movies', loggedInUser, userIsAdmin, (req, res, next) => {
  res.send('here be movies')
});

module.exports = router;
