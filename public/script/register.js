window.addEventListener("load",function () {
    const formulario = document.getElementById("formulario");
    const inputs = document.querySelectorAll("#formulario input");
    
    const expresiones = {
        nombre:/^[a-zA-ZÀ-ÿ\s]{2,40}$/ , // Letras y espacios, pueden llevar acentos.
        apellido: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, 
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,10}$/
    }
    const campos = {
        nombre: false,
        apellido: false,
        email: false,
        password: false,
        password2:false
    }
    function validarFormulario(e){
        switch (e.target.name) {
            case "nombre":
                validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
            case "apellido":
                validarCampo(expresiones.apellido, e.target, 'apellido');
            break;
            case "email":
                validarCampo(expresiones.email, e.target, 'email');
            break;
            case "password":
                validarCampo(expresiones.password, e.target, 'password');
                validarPassword2();
            break;
            case "password2":
                validarCampo(expresiones.password, e.target, 'password2');
                validarPassword2();
            break;
            
        }
    }
    const validarPassword2 = () => {
        const inputPassword1 = document.getElementById('password');
        const inputPassword2 = document.getElementById('confirmPassword');
    
        if(inputPassword1.value === inputPassword2.value){
            document.getElementById(`grupo_password2`).classList.remove('grupo-incorrecto');
            document.getElementById(`grupo_password2`).classList.add('grupo-correcto');
            document.querySelector(`#grupo_password2 i`).classList.remove('fa-times');
            document.querySelector(`#grupo_password2 i`).classList.add('fa-check');
            document.querySelector(`#grupo_password2 .mensajeError`).classList.remove('mensajeError-activo');
            campos['password'] = true;
        } else {
            document.getElementById(`grupo_password2`).classList.add('grupo-incorrecto');
            document.getElementById(`grupo_password2`).classList.remove('grupo-correcto');
            document.querySelector(`#grupo_password2 i`).classList.add('fa-times');
            document.querySelector(`#grupo_password2 i`).classList.remove('fa-check');
            document.querySelector(`#grupo_password2 .mensajeError`).classList.add('mensajeError-activo');
            campos['password'] = false;
        }
    }
    

    function validarCampo(expresion,input,campo){
        if(expresion.test(input.value)){
            document.getElementById(`grupo_${campo}`).classList.remove('grupo-incorrecto');
            document.getElementById(`grupo_${campo}`).classList.add('grupo-correcto');
            document.querySelector(`#grupo_${campo} i`).classList.remove('fa-times');
            document.querySelector(`#grupo_${campo} i`).classList.add('fa-check');
            document.querySelector(`#grupo_${campo} .mensajeError`).classList.remove('mensajeError-activo');
            campos[campo]=true;
        } else {
            document.getElementById(`grupo_${campo}`).classList.add('grupo-incorrecto');
            document.getElementById(`grupo_${campo}`).classList.remove('grupo-correcto');
            document.querySelector(`#grupo_${campo} i`).classList.add('fa-times');
            document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check');
            document.querySelector(`#grupo_${campo} .mensajeError`).classList.add('mensajeError-activo');
            campos[campo]=false;
        }
    }
    
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keyup', validarFormulario);
        inputs[i].addEventListener('blur', validarFormulario);
    }
    
    document.getElementById('confirmPassword').addEventListener('keyup', validarFormulario);
    document.getElementById('confirmPassword').addEventListener('blur', validarFormulario);

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        const terminos = document.getElementById('terminos');
        if(campos.nombre && campos.apellido && campos.password && campos.password && campos.email){
            formulario.submit();
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