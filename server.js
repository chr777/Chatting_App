
const express = require('express');

const app = express();

const path = process.cwd();

const http = require('http').Server(app);
const socketio = require('socket.io')(http);
app.set('socketio', socketio);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/messages', require(`${path}/routes/messages.js`));
app.use('/users', require(`${path}/routes/users.js`));

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})


const User = require(`${path}/schemas/users.js`);

const {login} = require(`${path}/models/users.js`);

app.post('/login', async function(req, res) {
  const body = req.body;
  try{
    const user = await login(body.username, body.password);
    res.send(user);
    res.status(200).end();
}
  catch(err){
      if(err.message === `User: ${body.username} was not found!`){
             res.status(404).send(err.message);
      }
      if(err.message === 'Password is incorrect. ): Please Try again!'){ 
           res.status(401).send(err.message);
      }
      console.error(err.stack);
  }     
})

app.use(function(req, res, next) {
  res.status(404).send('page was not found!!');
})

app.use(function(err, req, res, next) {
  // if(err.message === 'user not found') {
  //     res.status(404).send('user was not found');
  // } else {
  //     console.log(err);
  //     socketio.emit('error', err.message);
  //     res.status(500).send('something went wrong');
  // }
})


socketio.on('connect', function() {
  console.log('someone connected');
})

http.listen(3000, function() {
  console.log('server is up and running...');
})

