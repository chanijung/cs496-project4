var express      = require('express')
var cookieParser = require('cookie-parser')

var app = express();
app.use(cookieParser());

const jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config({path:'../../.env'});
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    try{
        // console.log("verifytoken try");
        // console.log("SECRET KEY in authorization: ",SECRET_KEY);
        console.log(req.cookies);
        const clientToken =req.cookies.user;
        const decoded = jwt.verify(clientToken, SECRET_KEY);
        

        if (decoded){
            res.locals.uid = decoded.uid;
            next();
        } else{
            res.status(401).json({error: 'unauthorized'});
        }
    } catch (err) {
        res.status(401).json({error: 'token expired'});
    }
};

exports.verifyToken = verifyToken;