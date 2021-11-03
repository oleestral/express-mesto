const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const usersRouter = require('./routes/user');
const cardsRouter = require('./routes/card');
const { createUser, login } = require('./controllers/user');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');

const { PORT = 3000 } = process.env;

const app = express();

// connect to server
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use((req, res, next) => {
  next(new NotFound('Ресурс не найден'));
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
