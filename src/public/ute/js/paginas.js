document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.buttons.setEvetnButtonRegister();
    /* modsJS.buttons.setBtnLogin(); */
    modsJS.ini();
});

const modsJS ={
    grid:null,
    ini:function(){
        modsJS.grid =  utilGrid.createGrid({
            script:'#grid-template',
            element:"#demo",
            columns:[
                {name:'NOMBRE', visible:true},
                {name:'URL', visible:true},
                {name:'DESCRIPCION'},{name:''}
            ],
            data:[],
            component:modsJS.getComponent()
          });
          modsJS.getPages();
    },
    getComponent:function(){
        utilGrid.methods.getObject  = modsJS.getEmpleado;
        return {
            template:'#grid-template',
            props:    utilGrid.propsDefault,
            data: utilGrid.dataDefault,
            component: utilGrid.component,
            computed: utilGrid.computed,
            filters: utilGrid.filters,
            methods: utilGrid.methods

        }
  },
    buttons:{
        setEvetnButtonRegister:function(){
            const $element = document.getElementById('btnSave');
            $element.addEventListener('click',function(){
                modsJS.save(modsJS.createObject());
            });
        }
    },
    
    createObject:function(){
        const $frm  = document.getElementById('frmAccesos');
        const $inputs = $frm.querySelectorAll('input');
        const object = new Object();
        $inputs.forEach(function(value,kye){
            object[value.name] = value.value;
        });
        console.log(object);
        return object;
    },
    save:function(object){
        $.ajax({
            method: "POST",
            url: "/ute/saveURL",
            data: object,
            dataType: 'json'
        }).done(function (result) {
            console.log(result);
        });
    },

    getPages:function(){
        $.ajax({
            method: "GET",
            url: "/ute/getPages",
            dataType: 'json'
        }).done(function (result) {
            modsJS.grid._data.gridData = []
            modsJS.grid._data.gridData =result;
        });
    }
};
