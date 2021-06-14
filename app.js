const express = require('express');
const path = require('path');

// Init app
const app = express();

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', (req, res) => {
  let articles = [
    {
      id: 1,
      title: 'Article #1',
      author: 'Matyas Herman',
      body: 'This is article 1',
    },
    {
      id: 2,
      title: 'Article #2',
      author: 'Matyas Herman',
      body: 'This is article 2',
    },
    {
      id: 3,
      title: 'Article #3',
      author: 'Matyas Herman',
      body: 'This is article 3',
    },
  ];
  res.render('index', { title: 'Homepage', articles: articles });
});

// Add Article route
app.get('/articles/add', (req, res) => {
  res.render('add_article', { title: 'Add Article' });
});

// Start server
app.listen(3000, () => {
  console.log('Server up and running on port 3000..');
});
