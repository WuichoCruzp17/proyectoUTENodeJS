document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

var modsJS ={
    grid:null,
    ini:function(){
        modsJS.buttons.setEventClickSeenForm();
        modsJS.setComponentes();
        modsJS.from();
        modsJS.grid =  utilGrid.createGrid({
            script:'#grid-template',
            element:"#demo",
            columns:[
                {name:'nombre'},{name:'email'},{name:''}
            ],
            data:[],
            component:modsJS.getComponent()
          });
    },
    buttons:{
        setEventClickSeenForm:function(){
            const $btn = document.getElementById('btnSave');
            $btn.addEventListener('click',function(){
                modsJS.valideDatos();
            });
        }
    },
    from:function(){
     modsJS.fromEl =    util.createVueFrom({
            el:'#frmEmpleados',
            data:{
                empleadoId:0,
                usuarioId:0,
                nombre:'',
                apellidoPaterno:'',
                apellidoMaterno:'',
                fechaNacimiento:null,
                email:''
            }
            /* watch:{
                fechaNacimiento:function (fechaNacimiento) {
                    fechaNacimiento = moment(new Date(fechaNacimiento)).format("YYYY-MM-DD")
                    modsJS.setFecha(fechaNacimiento);
                }
            } */
        })
    },
    clenFrom:function(){
        util.clenFrom(modsJS.fromEl._data);
    },
    valideDatos:function(){
        const $frmEmpleados = document.getElementById('frmEmpleados');
        const $inputs = $frmEmpleados.querySelectorAll('.empleados');
        console.log($inputs);
        var c =0;
        var cV =0;
        const object ={};
        for(var i=0;i<$inputs.length;i++){
            switch($inputs[i].type){
                case'file':
                object[$inputs[i].name] = $inputs[i].value;
                break;
                case 'textarea':
                object[$inputs[i].name] = $inputs[i].value;
                break;
                case 'date':
                object[$inputs[i].name] = $inputs[i].value;
                break;
                case'select-one':
                if($inputs[i].value !=="0"){
                    cV++;
                    c++;
                    $inputs[i].classList.remove('danger-border');
                    object[$inputs[i].name] = $inputs[i].value;
                }else{ $inputs[i].classList.add('danger-border');}
                break;
                default:{
                    c++; 
                    if($inputs[i].value ===""){
                        $inputs[i].classList.add('danger-border');
                    }else{ $inputs[i].classList.remove('danger-border'); cV++; object[$inputs[i].name] = $inputs[i].value;}
                }
            }
            
        }
        if(c ===cV){
            if(object.empleadoId!==""){
                modsJS.update(object);
            }else{modsJS.save(object);}
            
        }
    },  save: function (object) {
        $.ajax({
            method: "POST",
            url: "/ute/saveEmpleado",
            data: object,
            dataType: 'json'
        }).done(function (result) {
           if(result){
            modsJS.clenFrom()
           }
        });
    },

    update:function(object){
        $.ajax({
            method: "POST",
            url: "/ute/empleados/updateEmpleado",
            data: object,
            dataType: 'json'
        }).done(function (result) {
           if(result){
            util.clenFrom(modsJS.fromEl._data);
            modsJS.getEmpleados();
           }
        });
    },
    setComponentes:function(){
        modsJS.getEmpleados();//table-responsive
    },
        
    getEmpleados:function(){
        $.ajax({
            method: "get",
            url: "/ute/empleados/getEmpleados",
            dataType: 'json'
        }).done(function (result) {
            console.log("JSOn",result);
            modsJS.getEmpleadosCallback(result);
        });
    },

    getEmpleadosCallback:function(data){
            modsJS.grid._data.gridData = []
            modsJS.grid._data.gridData =data;
    },

    getComponent:function(){
          utilGrid.methods.getObject  = modsJS.getEmpleado;
          utilGrid.methods.deleteObject = modsJS.prepateToRemoveEmpleado;
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

    getEmpleado:function(empleadoId){
        var obj = {empleadoId};
        $.ajax({
            method: "GET",
            url: "/ute/empleados/getEmpleadoFindById/"+empleadoId,
            dataType: 'json'
        }).done(function (result) {
            console.log(result);
            util.updateFrom(modsJS.fromEl,result);
        });
    },

    updateFrom:function(vuFrom,object){
        var temporal="";
        for(key in object) {
            temporal = key;
            key = modsJS.convertColumns( key.toLocaleLowerCase() );
            if(vuFrom.hasOwnProperty( key )){
                if(key.split('fecha').length>1){
                    vuFrom[key]= moment(new Date(object[temporal])).format("YYYY-MM-DD");
                }else{
                    vuFrom[key] = object[temporal];
                } 
            }
        }
    },

    prepateToRemoveEmpleado:function(id){
       var result =  confirm("¿Esta seguro de eliminar este empleado?");
       if(result){
           modsJS.removeEmpleado(id);
       }
    },

    removeEmpleado:function(id){
        $.ajax({
            method: "DELETE",
            url: "/ute/empleados/delete/"+id,
            dataType: 'json'
        }).done(function (result) {
            if(result.hasOwnProperty('success')){
                modsJS.getEmpleados();
            }
        });
    },
    validateUnderScript:function(string){
        return string.split('_').length>1 ? true:false;
    },

    convertColumns:function(column){
        if(modsJS.validateUnderScript(column)){
            const arr = column.split('_');
          return   column = arr[0]+ modsJS.getFirstCapitalLetter(arr[1]);
        }else{return column;}
    },

    getFirstCapitalLetter:function(letter){
        const arr = letter.split('');
        var string ="";
        for(var i=0; i<arr.length;i++){
            string  += (i===0) ? arr[i].toLocaleUpperCase() : arr[i];
        }
        return string;
    }
};