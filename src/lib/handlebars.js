const helpers ={};

helpers.fullName = function(user){
    console.log(user);
    return (user) ?`${user.NOMBRE} ${user.APELLIDO_PATERNO} ${user.APELLIDO_MATERNO}` :"";
};
helpers.getAge = function(fehcaNacimiento){
    if (fehcaNacimiento !== null) {
        var fechaNace = new Date(fehcaNacimiento);
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
module.exports = helpers;