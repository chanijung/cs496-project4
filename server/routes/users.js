var express = require('express');
var router = express.Router();
const usersController = require('./controllers/users.controllers');
const User = require('../models/user');


router.post('/join', usersController.createNewUser);
router.post('/login', usersController.createToken);

router.get('/id', function(req,res){
    // console.log("이름 찾기")
    User.findOne({uid:req.query.id}, function(err, user){
        if(err) return res.status(500).json({error:err});
        if(!user) return res.status(404).json({error: 'user not found'});
        res.json(user);
    })
});


module.exports = router;

// router.get('/', (req, res) => res.json({username:'bryan~'}));
// router.get('/group', (req, res) => res.json({username:'dev group bryan'}))
// router.post('/join', function(req,res){
//     const user = new User();
//     user.uid = req.body.uid;
//     user.pwd = req.body.pwd;
//     user.name = req.body.name;
//     user.semester = req.body.semester;
//     user.class = req.body.class;

//     user.save(function(err){
//         if (err){
//             console.error(err);
//             res.json({result:0});
//             return;
//         }
//         res.json({result:1});
//     });
// });


