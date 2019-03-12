document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

var modsJS ={
    ini:function(){
        modsJS.buttons.setEventClickSeenForm();
        modsJS.setComponentes();
    },
    buttons:{
        setEventClickSeenForm:function(){
            const $btn = document.getElementById('btnSave');
            $btn.addEventListener('click',function(){
                modsJS.valideDatos();
            });
        }
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

  util.gridUpdate({
    script:'#grid-template',
    element:"#demo",
    columns:['NOMBRE','EMAIL',''],
    data
  });
    }
};