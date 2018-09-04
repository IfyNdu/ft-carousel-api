require('dotenv').config();

const express = require('express'),
  cors = require('cors'),
  app = express(),
  database = require('./db'),
  port = process.env.PORT || 3000

app.use(cors());

app.get('/', (req, res) => {

  database.then(function (connection) {
    
    connection.query('SELECT * FROM `articles`', function (error, results, fields) {
      if (error) { res.send(error); }
      res.send(results);
    });
  });

});

app.post('/update', (req, res) => {

  database.then(function (connection) {
    connection.query('INSERT INTO `articles`', function (error, results, fields) {
 
    });
  });

});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
