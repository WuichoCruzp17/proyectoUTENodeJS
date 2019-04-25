const mysql =    require('mysql');
const {database} =    require('./keys');
const {promisify} = require('util');
const pool =mysql.createPool(database);

try{

}catch(err){console.log(err);}
pool.getConnection((err, connection)=>{

    if(err){
        if(err.code =='PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection was closed');
        }
        if(err.cdode==='ER_CON_COUNT_ERROR'){
            console.error('Database has to many connections');
        }
        if(err.code ==='ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    if(connection){
        connection.release();
        console.log('DB is Connected');
    }  
});
//Promisify Pool Query
pool.query =    promisify(pool.query);
module.exports = pool;