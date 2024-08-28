function devolverPub(idPub)
{
    fetch(`/devolverPub?idPub=${idPub}`)
    .then( response => response.json() )
    .then(data => {
        console.log(data)
        tituloPub = document.getElementById('tituloPub')
        autorPub = document.getElementById('autorPub')
        descripcionPub = document.getElementById('descripcionPub')
        idPublicacion = document.getElementById('idPublicacion')
        comentariosTotales = document.getElementById('comentariosTotales')

        tituloPub.value = ''
        autorPub.value = ''
        descripcionPub.value = ''
        idPublicacion.innerHTML = ''
        comentariosTotales.innerHTML = ''
        
        tituloPub.value = data.titulo
        autorPub.value = `${data.nombreAutor} ${data.apellidoAutor}`
        descripcionPub.value = data.descripcion
        idPublicacion.innerHTML = String(idPub)

        for(let j = 0; j < data.datosComentarios.length; j++)
        {
            seccionComentario = `
            <div class="row mb-3">
                <div class="col-3">
                    ${data.datosComentarios[j][0]}
                </div>
                <div class="col-9">
                    ${data.datosComentarios[j][1]}
                </div>
            </div>
            `
            comentariosTotales.innerHTML = comentariosTotales.innerHTML + seccionComentario
        }
    })
}

function enviarComentario()
{
    url = '/publicarComentario'
    datos = {
        'comentario':document.getElementById('comentarioUsuario').value,
        'idPublicacion':document.getElementById('idPublicacion').innerHTML
    }
    fetch(url,
    {
        method:"POST",
        headers:
        {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body:JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}


function getCookie(name)
{
    let cookieValue = null;
    if (document.cookie && document.cookie !== "")
    {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++)
        {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + "="))
            {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function cargarInformacionUsuario(idUsuario)
{
    /*
    PREGUNTA 4
    DESARROLLAR LA FUNCION DE JAVASCRIPT QUE PERMITA CONSULTAR LA RUTA 
    OBTENERDATOSUSUARIO?IDUSUARIO=${IDUSUARIO}

    REVISAR LA IMPLEMENTACION REALIZADA PARA EDITAR MOSTRAR PUBLICACIONES

    TENER EN CUENTA EL INPUT QUE ESTA OCULTO Y CARGAR AHI EL ID DEL USUARIO
    PARA PODER ENVIARLO AL SERVIDOR COMO PARTE DE LOS DATOS Y ASI PODER
    RECUPERAR EL OBJETO USUARIO Y ACTUALIZAR LOS DATOS
    */

     fetch(`/obtenerDatosUsuario?idUsuario=${idUsuario}`)
    .then(response => response.json())
    .then(data => {

        userNameUsuario = `${data.userNameUsuario}`
        nombreUsuario = `${data.nombreUsuario}`
        apellidoUsuario = `${data.apellidoUsuario}`
        emailUsuario = `${data.emailUsuario}`
        nroCelular = `${data.nroCelular}`
        perfilUsuario = `${data.perfilUsuario}`
        profesion = `${data.perfilUsuario}`

      /* Uso del elemento oculto para almacenar el id del usuario */
        usuarioId = document.getElementById('idUsuario')
        usuarioId.value = idUsuario

      /*  Llenado del formulario con los datos del usuario */
      /*  Se le añadió al formulario el atributo name=editarUsuario para acceder a los campos usando el atributo name */
        forma = document.forms["editarUsuario"]
        forma.usernameUsuario.value = userNameUsuario
        forma.nombreUsuario.value = nombreUsuario
        forma.apellidoUsuario.value = apellidoUsuario
        forma.emailUsuario.value = emailUsuario
        forma.nroCelular.value = nroCelular
        forma.perfilUsuario.value = perfilUsuario
        forma.profesionUsuario.value = profesion

    })



}