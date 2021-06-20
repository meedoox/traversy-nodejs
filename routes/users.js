const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Load User Model
let User = require('../models/user');

// Register Form
router.get('/register', (req, res) => {
  res.render('register');
});

// Register process
router.post('/register', (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(password);

  let errors = req.validationErrors();

  if (errors) {
    res.render('register', { errors: errors });
  } else {
    let newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save((err) => {
          if (err) {
            console.log(err);
            return;
          } else {
            req.flash('success', 'You are now registered and can log in.');
            res.redirect('/users/login');
          }
        });
      });
    });
  }
});

router.get('/login', (req, res) => {
res.render('login')
})

module.exports = router;
