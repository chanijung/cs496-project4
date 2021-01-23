var express = require('express');
var userRouter = express.Router();

userRouter.get('/', (req, res) => res.json({username:'bryan~'}));
userRouter.get('/group', (req, res) => res.json({username:'dev group bryan'}))

module.exports = userRouter;

