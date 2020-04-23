const express = require('express');
const router = express.Router();

const loggedInUser = require('../helpers/middlewares').loggedInUser
const userIsAdmin = require('../helpers/middlewares').userIsAdmin

/* GET home page */
router.get('/', (req, res, next) => {

  // req.user // passport makes this available 
  res.render('index', { user: req.user });

});

// axios example
router.get('/countries', (req, res) => {
  axios.get('https://restcountries.eu/rest/v2/lang/es').then((response) => {
    console.log("response.data", response.data)
    res.send("countries fetched")
    //res.render('countries', { countries: response.data })
  })
})

// here user needs to be logged in
router.get('/books', loggedInUser, (req, res, next) => {

  res.send('here be books')
});

// here user needs to be logged in && be an admin
router.get('/movies', loggedInUser, userIsAdmin, (req, res, next) => {
  res.send('here be movies')
});

module.exports = router;
