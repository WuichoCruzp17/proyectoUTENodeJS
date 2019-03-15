document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

var modsJS ={
    ini:function(){
        modsJS.buttons.setEventClickSeenForm();
        modsJS.setComponentes();
        modsJS.from();
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
        })
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
            console.log(object);
            modsJS.save(object);
        }
    },  save: function (object) {
        $.ajax({
            method: "POST",
            url: "/ute/saveEmpleado",
            data: object,
            dataType: 'json'
        }).done(function (result) {
           
        });
    },

    setComponentes:function(){
        modsJS.getEmpleados();//table-responsive
    },
        
    getEmpleados:function(){
        $.ajax({
            method: "get",
            url: "/ute/getEmpleados",
            dataType: 'json'
        }).done(function (result) {
            console.log(result);
            modsJS.getEmpleadosCallback(result);
        });
    },

    getEmpleadosCallback:function(data){
    modsJS.grid =  utilGrid.createGrid({
    script:'#grid-template',
    element:"#demo",
    columns:['NOMBRE','EMAIL',''],
    data,
    component:modsJS.getComponent()
  });
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

    getEmpleado:function(empleadoId){
        var obj = {empleadoId};
        $.ajax({
            method: "GET",
            url: "/ute/getEmpleadoFindById/"+empleadoId,
            dataType: 'json'
        }).done(function (result) {
            console.log(result);
            modsJS.updateFrom(result);
        });
    },

    updateFrom:function(object){
        var temporal="";
        for(key in object) {
            temporal = key;
            key = modsJS.convertColumns( key.toLocaleLowerCase() );
            if(modsJS.fromEl.hasOwnProperty( key )){
                modsJS.fromEl[key] = object[temporal];
            }
        }
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