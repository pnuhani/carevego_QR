const express = require('express');
//const helmet = require('helmet')
require('dotenv').config();
const compression = require('compression')
const rateLimit = require("express-rate-limit")
const app = express();
//const PORT = process.env.PORT || 8080;

const {Sequelize, DataTypes} = require('sequelize')

//setting up connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
})



const limiter = rateLimit({
  windowMs: 1*60*1000, //1 minute
  max:10 //limit each IP to 10 req per windowMs
});
//initialize
app.use(compression());
app.use(express.json());
app.use(limiter);

//Defining model
const qrData = sequelize.define('qr-data',{
    id:{
        type:DataTypes.STRING,
        primaryKey: true,
        allowNull:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    Phone:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    address:{
        type:DataTypes.STRING,
        allowNull:true
    }
  
  });
  
// Define an async function to handle the request
const handleRequest = async (req, res) => {
  try {
    const qrData = sequelize.define('qr-data',{
        id:{
            type:DataTypes.STRING,
            primaryKey: true,
            allowNull:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:true
        },
        Phone:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        address:{
            type:DataTypes.STRING,
            allowNull:true
        }
      
      });
    // Sync the model with the database
    await qrData.sync();
    const idQuery = req.query.id;

    // Fetch data from the database
    const qrData1 = await qrData.findOne({ where: { id: idQuery } });

    if (qrData1) {
      // If data exists, return it
      res.json(qrData1);
    } else {
      // If data doesn't exist, display a form
      res.send('Please provide your name, address, and phone number through a form.');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Example route handler
app.get('/data', handleRequest);


app.listen({port:8080},()=> {
  try{
      sequelize.authenticate();
      console.log("Connected to Database")
      sequelize.sync({alter:true});
  }
  catch(error){
      console.log("Couldn't connect to Database",error)
  }
  console.log("Server is running")
})
