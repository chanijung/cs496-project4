var express = require('express');
var router = express.Router();
const Famehall = require('../models/famehall');

router.get('/all', function(req, res){
    Famehall.find(function(err, famehall){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(famehall);
    })
});

// router.post('/admin/famehall', function(req, res){
//     var famehall = new Famehall();
//     var bodyParser = require('body-parser');
//     famehall.gitUrl = req.body.gitUrl;
//     famehall.team = req.body.team;
//     famehall.projectName = req.body.projectName;
//     famehall.year = req.body.year;

//     famehall.save(function(err){
//         if(err){
//             console.error(err);
//             res.json({result: 0});
//             return;
//         }
//         res.json(famehall);
//     });
// });


module.exports = router;