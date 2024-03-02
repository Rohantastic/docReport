const path = require('path');
const jwt = require('jsonwebtoken');
const newDoctorModel = require('../models/reportGenerateModel');

const getHome = (req,res)=>{
    res.sendFile(path.join(__dirname, "../", "views/", "home.html"));
}

const addNewdoctor = async (req,res)=>{
    const {doctorName, diagnosis,prescription} = req.body;
    const user = req.user;
    const userId = user.userId;
    const scan_link = req.file.filename;
    try{
        const response = await newDoctorModel.create({doctorName,diagnosis,prescription,userId,scan_link});
        if(response){
            res.status(200).json({success:true,id: response.reportId})
        }
    }catch(e){
        console.log(e);
    }
}

const fetchAllReports = async(req,res)=>{
    try{
        const userId = req.user.userId;
        
        const response = await newDoctorModel.findAll({where:{userId:userId}});

        res.status(200).json({response});
    }catch(e){
        console.log(e);
    }
}


module.exports = {getHome,addNewdoctor,fetchAllReports};