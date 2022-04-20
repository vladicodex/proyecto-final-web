var abogadosNombre = [];
var abogadosUsuario = [];
var abogadosClave = [];

function cargarAbogados() {
    fetch('../db/abogados.json')
        .then(respuesta => respuesta.json())
        .then(abogados => {
            abogados.forEach(abogado => {
                var nombre = abogado.nombre;
                var usuario = abogado.usuario;
                var clave = abogado.clave;

                abogadosNombre[abogado.id] = nombre;
                abogadosUsuario[abogado.id] = usuario;
                abogadosClave[abogado.id] = clave;

            })
        })
}

cargarAbogados();