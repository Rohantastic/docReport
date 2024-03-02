const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const signupRoute = require('./routes/signupRoute');
const loginRoute = require('./routes/loginRoute');
const homePageRoute = require('./routes/homeRoute');
const reportGenerateModel = require('./models/reportGenerateModel');
const userModel = require('./models/userModel');
const database = require('./configuration/database');
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(signupRoute);
app.use(loginRoute);
app.use(homePageRoute);


userModel.hasMany(reportGenerateModel, { foreignKey: 'userId' });
reportGenerateModel.belongsTo(userModel, { foreignKey: 'userId' });


database.sync({ force: false })
    .then(() => {
        console.log('Database synced successfully');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

app.listen(3000, () => {
    console.log('App is running on port 3000');
});
