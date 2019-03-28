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

utilModel.getColumn  =function(e, typeColumn){
    for(var key in e){
        if(e[key].hasOwnProperty(typeColumn)){
            return e[key].column;
        }
    }
}

utilModel.getColumnString =function(cols){
    var nameColumns ="";
    console.log("Columnas Seleccionadas: ",cols)
    const columns = (cols !== undefined && cols!==null) ? cols:this.columns;
    const c = this.getNumColumns(columns)-1;
    var i=0;
    for(var key in columns){
        nameColumns+= (i<c) ? columns[key].column + " as " +key +", ":columns[key].column + " as " +key;
	i++;

}
console.log(nameColumns);
return nameColumns;
    
}
utilModel.getNumColumns =function(cols){
    var i=0;
    console.log("Cols", cols);
    const columns = (cols !== undefined &&  cols !==null) ? cols:this.columns;
    for(var k in columns){
        i++;
    }
    console.log("Cantidad de columnas: ",i);
    return i;
};
utilModel.findById = async function(objectId,columns){
    try{const row = await pool.query(`SELECT ${this.getColumnString(columns)} FROM ${this.table.name} 
                WHERE ${this.getColumn(this.columns,'primarykey')} = ?`,[objectId]);
                if(row){
                    return row[0];
                }
    return null;
    }catch(err){return null; console.log(err);}
};
utilModel.findAll = async function(){
    try{
        const row = await pool.query(`SELECT ${this.getColumnString()} FROM ${this.table.name} 
            WHERE ${this.serialize()}
        `);
        return (row) ? row :null;
    }catch(err){console.log(err); return null;}
};

utilModel.serialize = function(){
    return `ELIMINADO_ID = 1 AND ESTATUS_ID = 1`;
};

utilModel.update = async function(columns){
    try{
        console.log("Columnas a Actualizar: ",columns);
       // const row = pool.query(`UPDATE ${this.table.name}  ${this.updateColumns(columns)}`)
       this.updateColumns(columns);
    }catch(err){console.log(err); return null;}
};

utilModel.updateColumns = function(cols){
    console.log("Update Columnas", cols);
    const numColumns = this.getNumColumns(cols.columns) -1;
    const columns = cols.columns;
    var columnsSet = "";
    var i =0;
    for(var key in columns){
        columnsSet += (i<numColumns) ? `SET ${columns[key].column} = ${columns[key].value},` : `SET ${columns[key].column} = ${columns[key].value}`
        i++;
    }
    console.log(columnsSet);
    return columns;
    console.log(numColumns);
};

/**Ejemplo de como setear las columnas cuando se solicite ciertas columnas de una tabla
 *  var cols = {
        columns:{
            nombre:pagina.columns.nombre,
            descripcion:pagina.columns.descripcion
        }
    };
 */

module.exports = utilModel;