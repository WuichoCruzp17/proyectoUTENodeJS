const utilModel ={};
utilModel.calcularEdad = function(){
    if(this.FECHA_NACIMIENTO !== null){
        var fechaNacimiento = new Date(this.FECHA_NACIMIENTO);
        console.log(fechaNacimiento.toLocaleDateString());
        var birthday_arr = fechaNacimiento.toLocaleDateString().split("/");
        console.log(birthday_arr);
        var birthday_date = new Date(birthday_arr[2], birthday_arr[1] - 1, birthday_arr[0]);
        var ageDifMs = Date.now() - birthday_date.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }else{return null;}
    
};
module.exports = utilModel;