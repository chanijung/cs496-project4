const express = require('express');
const app = express();
// const api = require('./routes/index');
const bodyParser = require('body-parser');
const port =  process.env.PORT || 3002;
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();


// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost/project4');


app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));
app.use(express.json());
// app.use('/api', api);
// app.use('/api', (req, res) => res.json({username:'bryan'}));

const userRouter = require('./routes/users');
app.use('/users', userRouter);

const famehallRouter = require('./routes/famehalls');
app.use('/famehalls', famehallRouter);

const projectRouter = require('./routes/projects');
app.use('/projects', projectRouter);

const communityRouter = require('./routes/community');
app.use('/communities', communityRouter);

const commentRouter = require('./routes/comments');
app.use('/comments', commentRouter);
const galleryRouter = require('./routes/gallery');
app.use('/gallery', galleryRouter);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})

var user = require('./models/user');
