const helpers ={};

helpers.fullName = function(user){
    console.log(user);
    return (user) ?`${user.NOMBRE} ${user.APELLIDO_PATERNO} ${user.APELLIDO_MATERNO}` :"";
};
module.exports = helpers;