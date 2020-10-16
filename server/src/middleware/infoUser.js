const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/db.config');
const db = require("../models");
const User = db.users;

module.exports=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization) return res.status(401).json({error:"vous n'etes pas autoriser"})
    const token=authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(error,payload)=>{
        if(error) return res.status(401).json({error:"vous n'etes pas autoriser"})
        const {_id}=payload
        User.findById(_id)
        .then((userRecuperer)=>{
            req.userInfo=userRecuperer
            next()
        })
        .catch(error=>console.log(error))
        
    })
}