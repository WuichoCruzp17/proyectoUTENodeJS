const pagina = require('../models/pagina');
const menuController = require('../controllers/menuController');
const paginaMenuController = require('../controllers/paginaMenuController');
const paginaController = {};

paginaController.executeQuery = async (query, params) => {
    return await pagina.executeQuery(query, params);
};

paginaController.findByProperty = async (property, value) => {
    return await pagina.findByProperty(property, value);
};

paginaController.findByAll = async () => {
    return await pagina.finByAll();
};

paginaController.getUsuarioAcceso = async (usuarioId) => {
    return await pagina.executeStored('getMenu', [usuarioId]);
};

paginaController.buildMenuHtml = async (pages) => {
    var html = "";
    const listaMenu = await menuController.findAll();
    for (var j = 0; j < listaMenu.length; j++) {
        html += `<li class="dropdown ttmenu-half"> 
        <a href="#" data-toggle="dropdown" class="dropdown-toggle">
        ${listaMenu[j].nombre}
        <b class="fa fa-angle-down"></b>
        </a>
        <ul class="dropdown-menu" style="display: none;">
                <li>
                <div class="ttmenu-content">
                <div class="row">
                <div class="col-md-6">
                <div class="box">
        <ul>
        `;
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].menuId == listaMenu[j].menuId) {
                html += `
                <li><a href="${pages[i].url}">${pages[i].nombre}</a></li>
                `;
            }
        }
        html += `</u>
        </div><!-- box -->
        </div><!-- col-md-6 -->
        </div><!-- row -->
        </div><!-- ttmenu-content -->
        </li>
        </ul>
        </li>`;
    }
    for (var i = 0; i < pages.length; i++) {
        if (pages[i].menuId == null) {
            html += ` <li><a href="${pages[i].url}">${pages[i].nombre}</a></li> `;
        }
    }

    return html;
};
module.exports = paginaController;