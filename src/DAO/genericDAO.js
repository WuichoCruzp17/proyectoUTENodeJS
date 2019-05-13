const pool = require('../database');

const genericDAO = {};

genericDAO.execute = async (query, params) => {
    try {
        console.log("Query -->",query);
        var rows = null;
        if (typeof params === "undefined") {
            rows = await pool.query(query);
        } else {
            rows = await pool.query(query, params);
        }
        return rows;
    } catch (err) {
        console.log("Error--->");
        console.log(err);
        console.log(params);
        return null;
    }
};
module.exports = genericDAO;