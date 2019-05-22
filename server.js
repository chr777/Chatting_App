const express = require('express');

const path = require('path');
const PATH = process.cwd();

const app = express();

const http = require('http').Server(app);
const socketio = require('socket.io')(http);
app.set('socketio', socketio);

 app.use(express.json());
 app.use(express.urlencoded({extended: true}));

 const {
  UserNotFound,
  UserAlreadyExists,
  PasswordIncorrect,
  ValidationError,
  } = require('./errors/errors.js');
app.use('/users', require('./routes/users.js'));
app.use(express.static('public'));

app.get('/main.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/main.html'))
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})


app.use(function(req, res, next) {
  res.status(404).send('page was not found!!');
})

app.use(function(err, req, res, next) {
  if (err.message === new UserNotFound().message) {
    res.status(404).send('User with that username was not found!');
  } else if (err.message === new PasswordIncorrect().message) {
    res.status(401).send('Invalid password!!!')
  } else if (err.message === new ValidationError().message) {
    res.status(400).send('Username must contain at least 4 characters!')
  } else if (err.message === new UserAlreadyExists().message) {
    res.status(409).send('User with that username or email already exists!')
  }else {
    console.log(err);
    res.status(500).send('something went wrong');
  }
  console.error(err.stack)
  res.status(500).end();
})


socketio.on('connect', function() {
  //console.log('someone is connected');
})

http.listen(3000, function() {
  console.log('server is up and running...');
})

