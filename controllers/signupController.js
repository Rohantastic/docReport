const path = require("path");
const UserModel = require("../models/userModel");
const bcrypt = require('bcrypt');


const redirectToSignupPage = (req,res)=>{
    res.sendFile(path.join(__dirname,"../","views/","signup.html"));
}

const userDataFromSignupPage = async (req,res)=>{
    let name = req.body.name;
    const password = req.body.password;
    const aadharNo = req.body.aadhar;
    const email = req.body.email;
    const phone = req.body.phone;
    const isDoctor = req.body.checkbox;
    if(isDoctor){
        name = "dr." + name;
    }
    try{
        
        const user = await UserModel.findOne({where:{phone:phone}});

        if(!user){
            bcrypt.hash(password,10,async (err,hash)=>{
                const result = await UserModel.create({name,password:hash,aadharNo,email,phone,isDoctor});
            })
            console.log("User has been created !!");

            res.status(200).json({success:true});
        }
        else{
            console.log("Problem with creating a user");
        }
        
    }catch(e){
        console.log(e);
    }
}

module.exports = {redirectToSignupPage,userDataFromSignupPage};