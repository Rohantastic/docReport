const express = require('express');
const route = express.Router();
const homeController = require("../controllers/homeController");
const authenticationMiddleware = require('../authentication/AuthMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

route.get('/home', homeController.getHome);
route.post("/add-new-doctor", authenticationMiddleware.authMiddleware, upload.single('scanFiles'), homeController.addNewdoctor);
route.get("/get-reports",authenticationMiddleware.authMiddleware, homeController.fetchAllReports);


route.post('/chat-bot',homeController.chatbotController);
module.exports = route;
