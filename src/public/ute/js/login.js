document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.buttons.setEvetnButtonRegister();
    /* modsJS.buttons.setBtnLogin(); */
});

const _object = {
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    matricula: '',
    email: '',
    password: ''
};

var modsJS = {

    buttons: {

        setBtnLogin: function () {
            const $btn = document.getElementById('btnLogin');
            $btn.addEventListener('click', function (e) {
                e.preventDefault();
                if(modsJS.validateFormulario('login-form')){
                    modsJS.login(modsJS.setObjectLogin());
                }
            });
        },

        setEvetnButtonRegister: function () {
            const $btn = document.getElementById('btnRegistrarse');
            $btn.addEventListener('click', function (e) {
                e.preventDefault();
                const result = modsJS.validateFormulario('register-form');
                if (result) {
                    const isValido = modsJS.validatePassword();
                    if (isValido) {
                        modsJS.setObject();
                    }
                }

            });
        }
    },

    validateFormulario: function (form) {
        const $element = document.getElementById(form);
        const $inputs = $element.querySelectorAll('input');
        const cont = $inputs.length;
        var c = 0;
        $inputs.forEach(function (item) {
            if (item.value != "") {
                if (item.name === 'email') {
                    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                    var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

                    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
                    if (reg.test(item.value) && regOficial.test(item.value)) {
                        console.log("válido oficial y extraoficialmente");
                    } else if (reg.test(item.value)) {
                        console.log("válido extraoficialmente");

                    } else {
                        alert('El correo no es valido');
                    }
                }
                c++;
            }

        });
        if (c !== cont) {
            alert('Por favor de llenar el fomulario');
            return false;
        } else {
            return true;

        }
    },

    validatePassword: function () {
        //
        const $password = document.getElementById('password_register');
        const $confirmPassword = document.getElementById('confirm-password_register');
        return ($password.value === $confirmPassword.value) ? true : false;
    },
    
    setObjectLogin:function(){
        const $element = document.getElementById('login-form');
        const $inputs = $element.querySelectorAll('.login');
        const object = new Object();
        $inputs.forEach(function(value,kye){
            object[value.name] = value.value;
        });
       /*  console.log(object); */
        return object;
    },

    setObject: function (object) {
        const $element = document.getElementById('register-form');
        /* console.log(populate( $element, _object)); */
        const $inputs = $element.querySelectorAll('.name');
        const alumno = new Object();
        $inputs.forEach(function (value, key) {
            alumno[value.name] = value.value;
        });
        modsJS.validateEmail(alumno);
    },

    validateEmail: function (object) {
        $.ajax({
            method: "POST",
            url: "/ute/validateDateAlumno",
            data: object,
            dataType: 'json'
        }).done(function (result) {
            var c = 0;
            var v = 0;
            modsJS.result = result;
            for (var i in result) {
                console.log(i);
                if (result[i] === 0) {
                    v++;
                }
                c++;
            }
            if (v === c) {
                modsJS.save(object);
            } else {
                console.log(result);
            }
        });
    },

    save: function (object) {
        $.ajax({
            method: "POST",
            url: "/ute/save",
            data: object,
            dataType: 'json'
        }).done(function (result) {
            console.log(result);
        });
    },

    login:function(object){
        console.log(object);
        $.ajax({
            method: "POST",
            url: "/ute/login",
            data: object,
            dataType: 'json'
        }).done(function (result) {
            console.log('Sesion',result);
        });
    }


};
