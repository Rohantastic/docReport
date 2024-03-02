const express = require('express');
const route = express.Router();
const signupController = require("../controllers/signupController");

route.get("/",signupController.redirectToSignupPage);

route.post("/signup", signupController.userDataFromSignupPage);

module.exports = route;