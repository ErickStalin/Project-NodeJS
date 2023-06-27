const mongoose = require('mongoose')

//Conexion de la base de datos atlas
// {DBUSER,DBPASSWORD,DBNAME} = process.env
//const MONGODB_URI = `mongodb+srv://${DBUSER}:${DBPASSWORD}@nuevo.pyjei75.mongodb.net/${DBNAME}`

const MONGOOSE_URI='mongodb://0.0.0.0:27017/portafolio' 
connection = async()=>{
    try {
         await mongoose.connect(MONGOOSE_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("LA BASE ESTA CONECTADA!")
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection