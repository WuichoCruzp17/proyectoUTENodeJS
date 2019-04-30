const pool =    require('../database');
const linkController ={};

linkController.getViewAcceso = async (req, res)=>{
    res.render('ute/paginas');
};
linkController.save =async(req, res)=>{
    const rows = await pool.query('INSERT INTO PAGINA VALUES(?,?,?,?)',[null, req.body.name, req.body.url, req.body.description]);
    res.json(rows);
};
linkController.getPages = async(req, res) =>{
    const rows = await pool.query('SELECT * FROM PAGINA');
    console.log(rows);
    res.json(rows);
};
module.exports = linkController;