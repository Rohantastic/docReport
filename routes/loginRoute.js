const express = require('express');
const route = express.Router();
const loginController = require("../controllers/loginController");


route.get("/login",loginController.loginController);

route.post("/login",loginController.loginPostController);

module.exports = route;