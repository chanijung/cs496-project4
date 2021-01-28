var express = require('express');
var router = express.Router();
const Community = require('../models/community');

router.get('/all', function(req, res){
    Community.find(function(err, community){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(community);
    })
});

router.get('/bulletin', function(req,res){
    console.log(req.query.type);
    Community.find({type:req.query.type},{_id:1, writer:1, date:1, type:1, title:1, content:1}, function(err, community){
        if(err) return res.status(500).json({error: err});
        if(community.length === 0) return res.status(404).json({error:'community not found'});
        res.json(community);
    })
});

router.post('/newwrite', function(req,res){
    var community = new Community();
    community.writer = req.query.writer;
    community.type = req.query.type;
    community.title = req.query.title;
    community.content = req.query.content;
    community.save(function(err){
        if(err){
            console.error(err);
            res.json({result:0});
            return;
        }
        res.json(community);
    })
})

module.exports = router;