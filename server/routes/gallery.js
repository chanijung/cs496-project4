var express = require('express');
var router = express.Router();
router.use(require('cookie-parser')());

const jwt = require('jsonwebtoken');
var dotenv = require('dotenv');

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const Image = require('../models/image');
const { verifyToken } = require('./middlewares/authorization');

router.post('/upload', async function(req,res){
    // let project = await new Project(req.body).save();
    let image = new Image(req.body);
    try{
        await image.save();
    }catch (err) {
        console.log("image save failed")
    }
    console.log("image saved")
    res.status(201).json({
        result:'ok',
    });
})

router.get('/all', function(req, res){
    Image.find(function(err, images){
        if(err){
            console.log("get all error")
            return res.status(500).send({error: 'database failure'});
        }
        // res.json(project);
        res.status(201).json({
            result:'ok',
            images: images
        });
    })
});

module.exports = router;