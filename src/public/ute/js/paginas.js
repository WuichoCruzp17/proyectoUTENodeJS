document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.buttons.setEvetnButtonRegister();
    /* modsJS.buttons.setBtnLogin(); */
});

const modsJS ={
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
        console.log('ajax');
        $.ajax({
            method: "POST",
            url: "/ute/saveURL",
            data: object,
            dataType: 'json'
        }).done(function (result) {
            console.log(result);
        });
    }
};
