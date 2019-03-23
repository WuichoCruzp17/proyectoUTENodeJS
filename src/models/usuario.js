const helpers = require('../lib/helpers');
let usuario ={};

usuario.table ={
    name:'USUARIO_ID'   
};

usuario.usuarioId ={
    column:'USUARIO_ID',
    primarykey:true
};
usuario.nombre = {
    column: 'NOMBRE'
};

usuario.apellidoPaterno ={
    column:'APELLIDO_PATERNO'
};

pagina.apellidoMaterno={
    column:'APELLIDO_MATERNO'
};

pagina = helpers.setFunctionsModels(pagina);

module.exports = pagina;
