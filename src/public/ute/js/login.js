document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.buttons.setEvetnButtonRegister();
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

        setEvetnButtonRegister: function () {
            const $btn = document.getElementById('btnRegistrarse');
            $btn.addEventListener('click', function (e) {
                e.preventDefault();
                modsJS.validateFormulario();
            });
        }
    },

    validateFormulario: function () {
        const $element = document.getElementById('register-form');
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
                        console.log( "válido oficial y extraoficialmente");
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
        } else {
            const isValido = modsJS.validatePassword();
            if (isValido) {
                modsJS.setObject();
            }
        }
    },

    validatePassword: function () {
        //
        const $password = document.getElementById('password_register');
        const $confirmPassword = document.getElementById('confirm-password_register');
        return ($password.value === $confirmPassword.value) ? true : false;
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
            }else{
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
    }


};
