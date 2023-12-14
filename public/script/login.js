window.addEventListener("load",function () {
    const formulario = document.getElementById("formulario_login");
    const inputs = document.querySelectorAll("#formulario_login input");
    
    const expresiones = {
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        contrasena: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,10}$/ 
    }
    const campos = {
        correo: false,
        password: false
    }
    function validarFormulario(e){
        switch (e.target.name) {
            case "correo":
                validarCampo(expresiones.correo, e.target, 'correo');
            break;
            case "password":
                validarCampo(expresiones.contrasena, e.target, 'password');
                
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
        if(campos.password && campos.correo){
            formulario.reset();

            document.querySelectorAll('.grupo-correcto').forEach((icono) => {
                icono.classList.remove('grupo-correcto');
            });

            document.getElementById('mensaje').classList.add('mensaje-activo');
            setTimeout(() => {
			document.getElementById('mensaje').classList.remove('mensaje-activo');
		    }, 3000);

            document.getElementById('mensaje-error').classList.remove('mensaje-error-activo');
        } else{
            document.getElementById('mensaje-error').classList.add('mensaje-error-activo');
        }
    })
})