const helpers = require('../lib/helpers');
let pagina ={};

pagina.table ={
    name:'PAGINA'   
};
pagina.columns={  
    paginaId:{
        column:'PAGINA_ID',
        primarykey:true
    },
    nombre:{
        column: 'NOMBRE'
    },
    url:{
        column:'URL'
    },
    descripcion:{
        column:'DESCRIPCION'
    }
};



pagina = helpers.setFunctionsModels(pagina);

module.exports = pagina;
