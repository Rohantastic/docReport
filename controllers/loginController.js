const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
require('dotenv').config();

const loginController = (req, res) => {
    console.log("should hit this >>>>>>>>>>>>>>>>>>");
    res.sendFile(path.join(__dirname, "../", "views/", "login.html"));
}


const loginPostController = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await UserModel.findOne({ where: { email } });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                console.log("Password is correct");
                const userId = user.id;
                const userName = user.name;
                const email = user.email;
                const phone = user.phone;

                const object = {
                    userId,userName,email,phone
                };

            
                const token = jwt.sign(object,process.env.SECRET_KEY,{expiresIn: '1h'});
                console.log('>>>>>>>>>>>>>>>>>>token', token);
                

                res.status(200).json({ success: true, message: "User is authorized", token});
            } else {
                console.log("Incorrect password");
                res.status(401).json({ success: false, message: 'Incorrect password' });
            }
        } else {
            console.log("User not found");
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (e) {
        console.error("Error during login:", e);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};



module.exports = { loginController, loginPostController };
