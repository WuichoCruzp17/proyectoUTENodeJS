const pool =    require('../database');
const linkController ={};
linkController.save =async(req, res)=>{
    const rows = await pool.query('INSERT INTO PAGINA VALUES(?,?,?,?)',[null, req.body.name, req.body.description,req.body.url]);
    res.json(rows);
};
module.exports = linkController;