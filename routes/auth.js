const express = require('express');
const router = express.Router();

const passport = require('passport')

// User model
const User = require('../models/user');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const loggedInUser = require('../helpers/middlewares').loggedInUser
const userIsAdmin = require('../helpers/middlewares').userIsAdmin

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});


// POST /signup
router.post('/signup', (req, res, next) => {

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(req.body.password, salt);

  let user = new User({ username: req.body.username, password: hashPass })
  user.save().then((theUser) => {
    req.login(theUser, () => { res.redirect('/') }) // theUser now has an _id because we stored it into the database
  })

})

router.get('/login', (req, res) => {
  //console.log(req.flash('error'))

  // req.flash('message') // <= this is always an array

  // redirect to homepage if already logged in
  if (req.user) {
    res.redirect('/')
  }

  res.render('auth/login', { errorArr: req.flash('message') })
})

// use LocalStrategy for authentication
router.post('/login', passport.authenticate('local', {
  successRedirect: '/', // pick up the redirectBackTo parameter and after login redirect the user there. ( default / )
  failureRedirect: '/login',
  failureFlash: true,
  // passReqToCallback: true
}))

router.get('/logout', (req, res) => {
  req.logout() // this one deletes the user from the session
  res.render('auth/logout');
})


module.exports = router;
