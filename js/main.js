function submitLogin() {

    var abogadosNombre = [];
    var abogadosUsuario = [];
    var abogadosClave = [];

    var username = document.getElementById('username-field').value;
    var password = document.getElementById('password-field').value;

    var accessDenied = true;

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

                    if((username == abogadosUsuario[abogado.id]) && (password == abogadosClave[abogado.id])){

                        accessDenied = false;
                        window.open("../oficinavirtual.html");
            
                    }
                })

                if(accessDenied == true && username != "" && password != ""){
                    alert("❌ ACCESO DENEGADO ❌");
                }

            })
    }

    cargarAbogados();

}