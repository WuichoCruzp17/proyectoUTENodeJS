const utilModel = {};
const pool =    require('../database');
const codeBss = require('../resources/codeBss');
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

utilModel.save = async function(cols){
    try{
        const row = await pool.query(`INSERT INTO ${this.table.name} VALUES(${this.saveColumns(cols)})`);
    }catch(err){console.log(err); return null;}
};

/**
 * Función que se encarga de actualizar un objeto en la base de datos.
 * @param {Object} columns Son las Columnas que se van a actualizar en la base de datos.
 * @param {Object} objectId Es el objeto que contiene el id del objeto a actualizar
 * @returns {Boolean} row Retorna un true  o un false 
 */
utilModel.update = async function(columns, objectId){
    try{
        const row =await  pool.query(`UPDATE ${this.table.name}  ${this.updateColumns(columns)} WHERE ${objectId.column} = ${objectId.value}`);
        /* console.log(row);
          var query = `UPDATE ${this.table.name}  ${this.updateColumns(columns)} WHERE ${objectId.column} = ${objectId.value}`;
        console.log(query); */
        return (row) ? true :false;
    }catch(err){console.log(err); return null;}
};
/**
 * Función que se encarga de realizar una consulta en la base de datos con el id del objeto.
 * @param {Int} objectId Es el id del objeto.
 * @param {Object} columns Son las columnas que se buscan de ese objeto. No es requerido
 */
utilModel.findById = async function(objectId,columns){
    console.log("Find: ", columns);
    try{const row = await pool.query(`SELECT ${this.getColumnString(columns)} FROM ${this.table.name} WHERE ${this.getColumn(this.columns,'primarykey')} = ?`,[objectId]);
                if(row){
                    return row[0];
                }
    return null;
    }catch(err){console.log("Error: ",err); return null;}
};

/**
 * Función que se encarga de realizar una consulta en la base de datos y retorna todos los registros que No esten eliminados
 * y que esten activos.
 * @param {Object} columns Son las columnas que se buscan obtener, No es requerido.
 */
utilModel.findAll = async function(columns){
    try{
        const row = await pool.query(`SELECT ${this.getColumnString(columns)} FROM ${this.table.name} WHERE ${this.generalizarCriteria()}`);
        return (row) ? row :null;
    }catch(err){console.log(err); return null;}
};


/**
 * Función que se encarga de obtener una columna de un objeto.
 * @param {Object} e representa un modelo
 * @param {String} typeColumn representa el nombre de la columna
 * @returns {String} retorna la columna
 */
utilModel.getColumn  =function(e, typeColumn){
    for(var key in e){
        if(e[key].hasOwnProperty(typeColumn)){
            return e[key].column;
        }
    }
}
/* utilModel.getColumn  =function(nameColumn){
    return this.columns[nameColumn].column;
} */
 /**
  * Función que se encarga de realizar un sring de las columnas seleccionadas 'NameColumn as newNameColumn'
  * @param {Object} cols Son las columnas seleccionadas. No es requerido
  * @returns {String} nameColumns Son las columnas ya con su nuevo rendonamiento
 */
utilModel.getColumnString =function(cols){
    var nameColumns ="";
    const columns = (cols !== undefined && cols!==null) ? cols:this.columns;
    const c = this.getNumColumns(columns)-1;
    var i=0;
    for(var key in columns){
        console.log(key);
        nameColumns+= (i<c) ? columns[key].column + " as " +key +", ":columns[key].column + " as " +key;
	i++;

}
console.log(nameColumns);
return nameColumns;  
}
/**
 * Función que se encarga de obtener el número de columnas de un objeto.
 * @param {Object} cols Son las columnas del objeto. No es requerido.
 * @returns {Int} i es la cantidad de columnas del objeto.
 */
utilModel.getNumColumns =function(cols){
    var i=0;
    const columns = (cols !== undefined &&  cols !==null) ? cols:this.columns;
    for(var k in columns){
        i++;
    }
    return i;
};

/**
 * Función que retorna las validaciones de ELIMINADO_ID y  ESTATUS_ID
 * @returns {String}
 */
utilModel.generalizarCriteria = function(){
    return `ELIMINADO_ID = ${codeBss.NOELIMINADO} AND ESTATUS_ID = ${codeBss.ACTIVO}`;
};

utilModel.saveColumns = function(cols){
    const numColumns = this.getNumColumns(cols.columns) -1;
    const columns = cols.columns;
    var setColumns ="";
    var i=0;
    for(var key in columns){
          setColumns += (i<numColumns) ? '?, ':'?';
        i++;
    }
    return setColumns;
};

/**
 * Función que se encarga de setear las columnas para despues ser usadas en el método de update.
 * @param {Object} cols Son las columnas a setear para su actualización.
 * @returns {String} columnsSet Retorna un String de las columnas ya seteadas con su valor.
 */
utilModel.updateColumns = function(cols){
    const numColumns = this.getNumColumns(cols.columns) -1;
    const columns = cols.columns;
    var columnsSet = "SET ";
    var i =0;
    for(var key in columns){
        columnsSet += (i<numColumns) ? `${columns[key].column} = ${columns[key].value}, ` : `${columns[key].column} = ${columns[key].value}`
        i++;
    }
    return columnsSet;
};
utilModel.executeQuery = async function(query){
    try{
        const row =await pool.query(query);
        return (row) ? row:null;
    }catch(err){console.log(err); return null;}
};

utilModel.select  = async function(columns, complement){
    try{
        var query = "SELECT";
        query +=(columns !== undefined && columns != null) ? ` ${columns} ` :" * ";
        query +=`FROM ${this.table.name} `
        query +=(complement !== undefined && complement !== null) ?  ` ${complement} `:'';
        const row = pool.query(query);
        return row;
    }catch(err){
        console.log(err);
        return null;
    }
};
utilModel.createObjecStringtWithModel = function () {
    var cols = this.columns;
    var objC = "function usuario( ";
    var objF = "{ \n";
    var i = 0;
    const numColumns = this.getNumColumns(cols)-1;
    for (var key in cols) {
        objC += (i < numColumns) ? key + ", " : key;
        objF += `this.${key} =${key}; \n`;
        i++;
    }
    objC += ")";
    objF += "\n }";
    objC += "\n " + objF;
    return objC;
};
/**Ejemplo de como setear las columnas cuando se solicite ciertas columnas de una tabla
 *  var cols = {
        columns:{
            nombre:pagina.columns.nombre,
            descripcion:pagina.columns.descripcion
        }
    };
    Ejemplo de parametros para la actualizacion de un objeto.
    { columns:{
        nombre:{
            column:pagina.columns.nombre.column,
            value:"'Pagina'"
        },
        descripcion:{
            column:pagina.columns.descripcion.column,
            value:"'Administrador de las paginas'"
        }
    }},{column:pagina.columns.paginaId.column, value:1}

 */

module.exports = utilModel;