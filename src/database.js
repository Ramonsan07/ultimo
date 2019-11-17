const mysql = require('mysql'); 
const {database} = require('./keys');//modulo para configurar la coneccion a la base de datos.
const {promisify} = require('util'); 
require('colors');

const pool = mysql.createPool(database);

pool.getConnection((error, conection)=>{
   // error.code = 'PROTOCOL_CONECTION_LOST';//quitale esta linea es solo para ver si el switch sirve. el switch sirve bien.
    if(error){
        switch(error.code){
            case 'PROTOCOL_CONECTION_LOST':
                console.error('DATABASE CONECTION LOST'.red);
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('DATABASE HAS TOO MANY CONECTIONS'.red);
                break;
            case 'ECONNREFUSED':
                console.error('DATABASE WAS REFUSED'.red);
                break;
                default: console.error(error.code, 'ERROR NO PREVISTO'.red);


        }
    }else{
        conection.release();
        console.log('DATABASE CONNECTED'.green);
    }


}); 

pool.query = promisify(pool.query);

module.exports = pool;