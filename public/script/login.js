window.addEventListener("load",function () {
    const formulario = document.getElementById("formulario_login");
    const inputs = document.querySelectorAll("#formulario_login input");
    
    const expresiones = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /.{8,25}$/ 
    }
    const campos = {
        email: false,
        password: false
    }
    function validarFormulario(e){
        switch (e.target.name) {
            case "email":
                validarCampo(expresiones.email, e.target, 'email');
            break;
            case "password":
                validarCampo(expresiones.password, e.target, 'password');
                break;
            
        }
    }

    function validarCampo(expresion,input,campo){
        if(expresion.test(input.value)){
            document.getElementById(`grupo_${campo}`).classList.remove('grupo-incorrecto');
            document.getElementById(`grupo_${campo}`).classList.add('grupo-correcto');
            document.querySelector(`#grupo_${campo} .mensajeError`).classList.remove('mensajeError-activo');
            campos[campo]=true;
        } else {
            document.getElementById(`grupo_${campo}`).classList.add('grupo-incorrecto');
            document.getElementById(`grupo_${campo}`).classList.remove('grupo-correcto');
            document.querySelector(`#grupo_${campo} .mensajeError`).classList.add('mensajeError-activo');
            campos[campo]=false;
        }
    }
    
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('blur', validarFormulario);
        inputs[i].addEventListener('blur', validarFormulario);
    }

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        const terminos = document.getElementById('terminos');
        if(campos.password && campos.email){
            //formulario.reset();
            document.querySelectorAll('.grupo-correcto').forEach((icono) => {
                icono.classList.remove('grupo-correcto');
            });
            formulario.submit()
            document.getElementById('mensaje-error').classList.remove('mensaje-error-activo');
        } else{
            document.getElementById('mensaje-error').classList.add('mensaje-error-activo');
        }
    })
})