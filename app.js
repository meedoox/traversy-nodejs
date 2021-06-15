const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

// Body parser middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

// Set Public folder
app.use(express.static(path.join(__dirname, 'public')));

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

// Get Article
app.get('/article/:id', (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    res.render('article', {
      article: article,
    });
  });
});

// Add Article route
app.get('/articles/add', (req, res) => {
  res.render('add_article', { title: 'Add Article' });
});

// POST Add Article route
app.post('/articles/add', (req, res) => {
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save((err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server up and running on port 3000..');
});
