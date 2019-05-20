// Define routes of /users/ api here
const express = require('express');

const router = express.Router();

const path = process.cwd();

const {getUser,
    getAllUsers,
    createUser} 
    = require(`${path}/models/users.js`);


router.post('/', async function(req, res) {
    try{
        const body = req.body;
        await createUser(body.username, body.first_name, body.last_name, body.email, body.password);
        res.status(200).end();
    }  
    catch(err){
        res.status(409).end();
    }   
})

router.get('/:username', async function(req, res) {
    
	try{
        const user = await getUser(req.params.username);
    	res.json(user);
	}
    catch(err){
	res.status(404).end();
    }
})

router.get('/', async function(req, res) {
    const users = await getAllUsers();
    res.json(users);
})


module.exports = router;

