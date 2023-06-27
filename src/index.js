require('dotenv').config() //Método para cargar las variables del archivo .env
const app = require('./server.js')
const connection = require('./database.js')



connection()
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})