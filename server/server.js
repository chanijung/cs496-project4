const express = require('express');
const app = express();
// const api = require('./routes/index');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;
const cors = require('cors');
const userRouter = require('./routes/users');
const mongoose = require('mongoose');

// CONNECT TO MONGODB SERVER
// var db = mongoose.connection;
// db.on('error', console.error);
// db.once('open', function(){
//     // CONNECTED TO MONGODB SERVER
//     console.log("Connected to mongod server");
// });
// mongoose.connect('mongodb://localhost/users');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use('/api', api);
// app.use('/api', (req, res) => res.json({username:'bryan'}));
app.use('/users', userRouter);
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})

var user = require('./models/user');
