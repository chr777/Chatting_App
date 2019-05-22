
const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

const path = process.cwd();

const {
  createMessage,
  getMessages,
  getRecentMessages
} = require(`${path}/models/messages.js`);

router.post('/messages', async function(req, res, next) {

  try {
    res.send(await createMessage(req.body.username, req.body.from, req.body.text));
    res.status(200).end();
  } catch (err) {
    next(err);
  }
})

router.get('/messages', async function(req, res, next) {
  try{
  res.send(await getMessages());
  res.status(200).end();
  }
  catch (err) {
    next(err);
  }
})

router.get('/postsMessages', async function(req, res, next) {
  try{
  res.send(await getRecentMessages());
  res.status(200).end();
  }
  catch (err) {
    next(err);
  }
})




module.exports = router;