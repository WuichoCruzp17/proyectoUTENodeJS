const helpers = require('../lib/helpers');
let empleado ={};
empleado.table={
    name:'EMPLEADO'
}
empleado.columns={
    empleadoId:{
        column:'EMPLEADO_ID',
        primarykey:true
    },

    nombre:{
        column:'NOMBRE'
    },

    apellidoPaterno:{
        column:'APELLIDO_PATERNO'
    },

    apellidoMaterno:{
        column:'APELLIDO_MATERNO'
    },

    fechaNacimiento:{
        column:'FECHA_NACIMIENTO'
    },

    email:{
        column:'EMAIL'
    },
    
    upload:{
        column:'UPLOAD'
    },

    descripcion:{
        column:'DESCRIPCION'
    },

    contrasena:{
        column:'PASSWORD'
    },

    usuarioId:{
        column:'USUARIO_ID'
    },

    eliminadoId:{
        column:'ELIMINADO_ID'
    },

    fechaCreacion:{
        column:'FECHA_CREACION'
    }

};

empleado = helpers.setFunctionsModels(empleado);

module.exports = empleado;
