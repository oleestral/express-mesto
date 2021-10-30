const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const usersRouter = require('./routes/user');
const cardsRouter = require('./routes/card');

const { PORT = 3000 } = process.env;

const app = express();

// connect to server
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '617c640349f3253927890a8a',
  };

  next();
});
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Ресурс не найден' });
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
