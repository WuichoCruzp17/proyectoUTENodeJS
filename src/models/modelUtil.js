const utilModel = {};
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
module.exports = utilModel;