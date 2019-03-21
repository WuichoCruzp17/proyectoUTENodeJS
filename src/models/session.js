const utilModels = require('./modelUtil');
/* function user(){

    this.usuarioId = null;
    this.empleadoId =null;
    this.alumnoId =null;
    this.nombre =null;
    this.apellidoPaterno=null;
    this.apellidoMaterno=null;
    this.fechaNacimiento=null;
    this.email = null;
} */

const user ={};
user.fullName = function(){
    return `${this.NOMBRE} ${this.APELLIDO_PATERNO} ${this.APELLIDO_MATERNO}`;
};

user.getEdad = utilModels.calcularEdad;
module.exports =  user;