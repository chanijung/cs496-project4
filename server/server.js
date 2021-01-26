const express = require('express');
const app = express();
// const api = require('./routes/index');
const bodyParser = require('body-parser');
const port = 3003;
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
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use('/api', api);
// app.use('/api', (req, res) => res.json({username:'bryan'}));

const userRouter = require('./routes/users');
app.use('/users', userRouter);

const famehallRouter = require('./routes/famehalls');
app.use('/famehalls', famehallRouter);

const projectRouter = require('./routes/projects');
app.use('/projects', projectRouter);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})

var user = require('./models/user');
