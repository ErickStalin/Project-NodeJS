const mongoose = require('mongoose')

//Conexion de la base de datos atlas
const {DBUSER,DBPASSWORD,DBNAME} = process.env
const MONGODB_URI = `mongodb+srv://${DBUSER}:${DBPASSWORD}@nuevo.pyjei75.mongodb.net/${DBNAME}`

connection = async()=>{
    try {
         await mongoose.connect(MONGODB_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("LA BASE ESTA CONECTADA!")
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection