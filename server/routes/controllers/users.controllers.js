const User = require('../../models/user');
const jwt = require('jsonwebtoken');
// require('dotenv').config();
var dotenv = require('dotenv');
// dotenv.config({path:'../../../.env'});
dotenv.config();

//user model 관련 부분 수정!

const SECRET_KEY = process.env.SECRET_KEY;
console.log("secret key in users.controller: ",SECRET_KEY);
exports.createToken = async function(req, res, next){
     try {
         const user = await User.find(req.body); //req.body: id,pw
        console.log("secret key in users.controller: ",SECRET_KEY);
         if (user.length){
            const token = jwt.sign({
                 uid:user[0].uid},
                 SECRET_KEY,
                 {expiresIn:'1h'});
            res.cookie('user', token);
            res.status(201).json({
                result:'ok',
                token
            });
        }
        else{
            res.status(400).json({error: 'invalid user'});
        }
    } catch (err){
        console.error(err);
        next(err);
    }
};

exports.createNewUser = async function(req, res, next){
    try {
        const user = await new User(req.body).save();

        res.status(201).json({
            result:'ok',
            user: user
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};