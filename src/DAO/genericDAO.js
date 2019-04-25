const pool =    require('../database');

const genericDAO ={};

genericDAO.execute = async (query, params) =>{
    try{
        var rows =null;
        if(typeof params ==="undefined"){
            rows = await pool.query(query);
        }else{
            rows = await pool.query(query,params);
        }
        return rows;
    }catch(err){
        console.log(err);
        return null;
    }
};
module.exports = genericDAO;