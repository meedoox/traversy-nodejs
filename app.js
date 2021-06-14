const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodejs-traversy');
let db = mongoose.connection;

// Check connection
db.once('open', () => {
  console.log('Connected to mongoDB');
});

// Check for db errors
db.on('error', (error) => {
  console.log(error);
});
// Init app
const app = express();

// Models
const Article = require('./models/article');

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) {
      console.log('Error ' + err);
    } else {
      res.render('index', { title: 'Homepage', articles: articles });
    }
  });
});

// Add Article route
app.get('/articles/add', (req, res) => {
  res.render('add_article', { title: 'Add Article' });
});

// Start server
app.listen(3000, () => {
  console.log('Server up and running on port 3000..');
});
