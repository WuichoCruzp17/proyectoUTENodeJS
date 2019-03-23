const utilModel = {};
const pool =    require('../database');
utilModel.calcularEdad = function () {
    if (this.FECHA_NACIMIENTO !== null) {
        var fechaNace = new Date(this.FECHA_NACIMIENTO );
        var fechaActual = new Date()
        var mes = fechaActual.getMonth();
        var dia = fechaActual.getDate();
        var año = fechaActual.getFullYear();
        fechaActual.setDate(dia);
        fechaActual.setMonth(mes);
        fechaActual.setFullYear(año);
        edad = Math.floor(((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365));
        return edad;
    } else { return null; }

};




utilModel.findById = async function(paginaId){
    const row = await pool.query(`SELECT ${this.getColumnString()} FROM ${this.table.name} 
                WHERE ${this.getColumn(this.columns,'primarykey')} = ?`,[paginaId]);
                if(row){
                    return row[0];
                }
    return null;
};

utilModel.getColumn  =function(e, typeColumn){
    for(var key in e){
        if(e[key].hasOwnProperty(typeColumn)){
            return e[key].column;
        }
    }
}

utilModel.getColumnString =function(){
    var columns ="";
    const c = this.getNumColumns(this)-1;
	var i=0;
    for(var key in this.columns){
        columns+= (i<c) ? this.columns[key].column + " as " +key +", ":this.columns[key].column + " as " +key;
	i++;

}
return columns;
    
}

utilModel.getNumColumns =function(){
    var i=0;
    for(var k in this.columns){
        i++;
    }
    return i;
};

utilModel.getNumColumns
module.exports = utilModel;