window.addEventListener("load",function () {
    const formulario = document.getElementById("formulario");
    const inputs = document.querySelectorAll("#formulario input");
    const selects = document.querySelectorAll("#formulario select");
    
    const expresiones = {
        titulo:/^[A-Za-z0-9\s\-.,!]{5,40}$/, // Letras y espacios, pueden llevar acentos.
        autor: /^[A-zA-ZÀ-ÿ\s]{2,40}$/,
        editorial:/^[A-zA-ZÀ-ÿ\s]{2,40}$/,
        paginas:/^\d+$/,
        idioma:/^[A-zA-ZÀ-ÿ\s]{4,40}$/,
        stock:/^\d+$/,
        precio:/^\d+(\.\d{1,2})?$/,
        lanzamiento:/^\d{4}-\d{2}-\d{2}$/,// Año-mes-dia
        sinopsis:/^[A-zA-ZÀ-ÿ\s]{20,1000}$/,
        portada:/\.(jpg|jpeg|png|gif)$/
        
    }
    const campos = {
        titulo: false,
        autor: false,
        editorial:false,
        paginas:false,
        idioma:false,
        tapa:false,
        tematica:false,
        stock:false,
        precio:false,
        lanzamiento:false,
        sinopsis:false,
        portada:false
    }
    function validarFormulario(e){console.log(e)
        switch (e.target.name) {
            case "titulo":
                validarCampo(expresiones.titulo, e.target, 'titulo');
            break;
            case "autor":
                validarCampo(expresiones.autor, e.target, 'autor');
            break;
            case "editorial":
                validarCampo(expresiones.editorial, e.target, 'editorial');
            break;
            case "paginas":
                validarCampo(expresiones.paginas, e.target, 'paginas');
            break;
            case "idioma":
                validarCampo(expresiones.idioma, e.target, 'idioma');
            break;
            case "tapa":
                validarCampoSelec('tapa');
            break;
            case "tematica":
                validarCampoSelec('tematica');
            break;
            case "stock":
                validarCampo(expresiones.stock, e.target, 'stock');
            break;
            case "precio":
                validarCampo(expresiones.precio, e.target, 'precio');
            break;
            case "lanzamiento":
                validarCampo(expresiones.lanzamiento, e.target, 'lanzamiento');
            break;
            case "sinopsis":
                validarCampo(expresiones.sinopsis, e.target, 'sinopsis');
            break;
            case "portada":
                validarCampo(expresiones.portada, e.target, 'portada');
            break;
    
        }
    }
    function validarCampoSelec(campo){
        let tipos=document.getElementById(`tipo_tapa`);
            let valorOp=tipos.value;
        
            if(valorOp === `Op`){
                document.querySelector(`#grupo_${campo} .mensajeError`).classList.add('mensajeError-activo');
                campos[campo]=false;
            }else{
                document.querySelector(`#grupo_${campo} .mensajeError`).classList.remove('mensajeError-activo');
                campos[campo]=true;
            }
    }
    function validarCampo(expresion,input,campo){
        if(expresion.test(input.value)){
            document.querySelector(`#grupo_${campo} .mensajeError`).classList.remove('mensajeError-activo');
            campos[campo]=true;
        } else {
            document.querySelector(`#grupo_${campo} .mensajeError`).classList.add('mensajeError-activo');
            campos[campo]=false;
        }
    }

    function validarTapa(){
        let tipo_tapa = document.getElementById("tipo_tapa").value;
        if(tipo_tapa != "Op"){
            campos.tapa = true;
        }
    }
    function validarTematica(){
        let tematica = document.getElementById("tematica").value;
        if(tematica != "Op"){
            campos.tematica = true;
        }
    }
    
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('blur', validarFormulario);
        inputs[i].addEventListener('blur', validarFormulario);
    }

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        const terminos = document.getElementById('terminos');
        validarTapa();
        validarTematica();
        if(campos.titulo && campos.autor && campos.editorial && campos.paginas && campos.idioma && campos.tematica && 
           campos.tapa && campos.stock && campos.precio && campos.lanzamiento && campos.sinopsis && campos.portada){
            formulario.submit();
            formulario.reset();
            document.getElementById('mensaje-error').classList.remove('mensaje-error-activo');
        } else{console.log(campos)
            document.getElementById('mensaje-error').classList.add('mensaje-error-activo');
        }
    })
})