const {DataTypes} = require('sequelize');
const database = require('../configuration/database');

const doctors = database.define('doctor',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    doctorName:{
        type: DataTypes.STRING,
        allowNull:false
    }
})

//database.sync();

module.exports = doctors;