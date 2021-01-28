var express = require('express');
var router = express.Router();
const Comment = require('../models/comment');

router.get('/all', function(req, res){
    console.log("들어왔다")
    Comment.find({community_id:req.query.id},{_id:1, writer:1, date:1, content:1, community_id:1}, function(err, comment){
        console.log(comment);
        if(err) return res.status(500).json({error: err});
        if(comment.length === 0) return res.status(400).json({error: 'comment not found'});
        res.json(comment);
    })
});

router.post('/submit', function(req, res){
    var comment = new Comment();
    comment.writer = req.query.writer;
    comment.content = req.query.content;
    comment.community_id = req.query.community_id;
    comment.save(function(err){
        if(err){
            console.error(err);
            res.json({result:0});
            return;
        }

        res.json(comment);
    });
});

module.exports = router;