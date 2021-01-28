// var express      = require('express')
// var cookieParser = require('cookie-parser')
// var app = express();
// app.use(cookieParser());

var express = require('express');
var router = express.Router();
router.use(require('cookie-parser')());

const jwt = require('jsonwebtoken');
var dotenv = require('dotenv');

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const Project = require('../models/project');
const User = require('../models/user');
const { verifyToken } = require('./middlewares/authorization');

//Write submission
router.post('/submit', verifyToken, async function(req,res){
    try {
        // let project = await new Project(req.body).save();
        let project = new Project(req.body);
        try{
            console.log(req.cookies);
            const clientToken =req.cookies.user;
            const decoded = jwt.verify(clientToken, SECRET_KEY);
            if (decoded){
                console.log("decoded");
                const uid = decoded.uid;
                const user = await User.findOne({uid: uid});
                project.semester = user.semester;
                project.classNum = user.classNum;
                await project.save();
            } else{
                console.log("not decoded");
                res.status(401).json({error: 'unauthorized in /submit'});
            }
        } catch (err) {
            console.log("first catch")
            res.status(401).json({error: 'token expired in /submit'});
        }
        console.log("project saved?")
        res.status(201).json({
            result:'ok',
            project: project
        });
    } catch (err) {
        console.log("second catch")
        console.error(err);
    }
})

router.get('/all', function(req, res){
    Project.find(function(err, projects){
        if(err) return res.status(500).send({error: 'database failure'});
        // res.json(project);
        res.status(201).json({
            result:'ok',
            projects: projects
        });
    })
});


router.post('/vote', async function(req,res){
    let gitUrl = req.body.gitUrl;
    console.log("vote gitUrl: ", gitUrl);
    const project = await Project.findOne({gitUrl: gitUrl});
    console.log("project found: ", project);
    project.votes += 1;
    project.save();
    res.status(201).json({
        result:'ok'
    });
})


module.exports = router;