const jwt = require('jsonwebtoken');
require('dotenv').config();

async function authMiddleware(req,res,next){
    const Bearertoken = req.header('Authorization');
    
    if(Bearertoken){
        const token = Bearertoken.slice(7);
        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(err){
                res.status(403).json({message: 'forbidden'});
            }else{
                req.user = user;
                next();
            }
        });

    }else{
        res.status(401).json({message:"Unauthorized"})
    }
    
}


module.exports = {authMiddleware};