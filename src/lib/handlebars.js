const handlebars =  require('handlebars');
const helpers ={};

helpers.fullName = function(user){
    console.log(user);
    return (user) ?`${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}` :"";
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

helpers.buildMenu = function(pages){
    var r ="";
    for(var i=0; i<pages.lenth;i++){
        console.log("Pagina :" +i +" "+pages[i]);
        r +=pages[i].rul +" ";
    }
    /* console.log("Paginas a pintar -->"+pages[0]); */
};

helpers.handlebars = function(html){
    console.log("Handlebars--->"+handlebars.SafeString);
    return new  handlebars.SafeString(html);
}
module.exports = helpers;