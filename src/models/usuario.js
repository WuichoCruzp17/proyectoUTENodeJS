const helpers = require('../lib/helpers');
let usuario ={};

usuario.table ={
    name:'USUARIO'   
};

usuario.columns={
    usuarioId:{
        column:'USUARIO_ID',
        primarykey:true
    },
    nombre:{
        column: 'NOMBRE'
    },

    descripcion:{
        column:'DESCRIPCION'
    }
}


usuario = helpers.setFunctionsModels(usuario);

module.exports = usuario;
