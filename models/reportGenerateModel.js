const {DataTypes} = require('sequelize');
const database = require('../configuration/database');

const newDoctor = database.define('report',{
    reportId: {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    doctorName:{
        type: DataTypes.STRING,
        allowNull : false
    },
    diagnosis: {
        type: DataTypes.STRING,
        allowNull:false
    },
    prescription: {
        type: DataTypes.STRING,
        allowNull:false
    },
    scan_link:{
        type: DataTypes.STRING,
        allowNull:true
    }
});


//database.sync();


module.exports = newDoctor;