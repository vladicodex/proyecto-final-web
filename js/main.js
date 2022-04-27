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

////////////////////////////////////////////////////////////////////////////////////////////////////////

function agregarNuevoUsuario(){

    const abogados =     {
        "id": 0,
        "nombre": "Vladimir Jimenez",
        "usuario": "vjimenez",
        "clave": "vjimenez"
    };

    const jsonString = JSON.stringify(abogados);
    console.log(jsonString);

    jsonReader("../db/abogados.json", (err, abogados) => {
        if (err) {
          console.log("Error reading file:", err);
          return;
        }
        // change value
        abogados.nombre = NombreIngresado;
        abogados.usuario = NombreIngresado;
        abogados.clave = NombreIngresado;
        fs.writeFile("./customer.json", JSON.stringify(customer), err => {
          if (err) console.log("Error writing file:", err);
        });
      });

}

////////////////////////////////////////////////////////////////////////////////////////////////////////
var iteracion = 0;

document.getElementById("formulario").addEventListener("submit", crear);

//Funcion crear
function crear(e){
    tipo = document.getElementById("tipo").value
    fecha = document.getElementById("fecha").value
    titular = document.getElementById("titular").value
    descripcion1 = document.getElementById("descripcion1").value
    link = document.getElementById("link").value
    lugar = document.getElementById("lugar").value

    let caso = {
        tipo,
        fecha,
        titular,
        descripcion1,
        link,
        lugar
    }

    if(localStorage.getItem("Casos") === null){
        let casos = []
        casos.push(caso)
        localStorage.setItem("Casos",JSON.stringify(casos))
    }else{
        let casos = JSON.parse(localStorage.getItem("Casos"))
        casos.push(caso)
        localStorage.setItem("Casos",JSON.stringify(casos))
    }
    leer();
    document.getElementById("formulario").reset();
    alert("Caso guardado correctamente");
    e.preventDefault();
}


//Funcion leer
function leer(){
    let casos = JSON.parse(localStorage.getItem("Casos"));
    document.getElementById("tbody").innerHTML = ""
    for(let i=0; i < casos.length; i++){

        let tipo = casos[i].tipo
        let fecha = casos[i].fecha
        let titular = casos[i].titular
        let descripcion1 = casos[i].descripcion1
        let link = casos[i].link
        let lugar = casos[i].lugar

        document.getElementById("tbody").innerHTML +=
        `
        <tr>
            <td><input type="checkbox"></td>
            <td>${fecha}</td>
            <td>${titular}</td>
            <td>${lugar}</td>
            <td>${tipo}</td>
            <td>${link}</td>
            <td>${descripcion1}</td>
            <td><button onclick="eliminar('${titular}')" class="btn btn-danger">Eliminar</button></td>
            <td><button onclick="editar('${titular}')" class="btn btn-secondary">Editar</button></td>
        </tr>`
    }
}

//Funcion editar
function editar(titular){
    let casos = JSON.parse(localStorage.getItem("Casos"));
    for(let i=0; i<casos.length; i++){
        if(casos[i].titular === titular){
            document.getElementById("body").innerHTML =
            `
            <div class="card">
                <div class="card-header">
                    <h2>Editar caso</h2>
                </div>
                <div class="card-body">
                <form id="formulario">
                    <br>
                    <div class="form-group">
                        <a>Seleccione la fecha: </a>
                        <input type="date" id="newfecha" class="form-control" placeholder="${casos[i].fecha}">
                    </div>
                    <br>
                    <div class="form-group">
                        <a>Seleccione el cliente:</a>
                        <select class="form-select" name="newtitular" id="newtitular">
                            <option selected>${casos[i].titular}</option>
                            <option>Cliente 2</option>
                            <option>Cliente 3</option>
                            <option>Cliente 4</option>
                            <option>Cliente 5</option>
                        </select>
                    </div>
                    <br>
                    <div class="form-group">
                        <a>Seleccione el abogado:</a>
                        <select class="form-select" name="newlugar" id="newlugar">
                            <option selected>${casos[i].lugar}</option>
                            <option>Abogado 2</option>
                            <option>Abogado 3</option>
                            <option>Abogado 4</option>
                            <option>Abogado 5</option>
                        </select>
                    </div>
                    <br>
                    <div class="form-group">
                        <a>Seleccione el tipo de caso:</a>
                        <select class="form-select" name="newtipo" id="newtipo">
                            <option selected>${casos[i].tipo}</option>
                            <option>Tipo 2</option>
                            <option>Tipo 3</option>
                            <option>Tipo 4</option>
                            <option>Tipo 5</option>
                        </select>
                    </div>
                    <br>
                    <div class="form-group">
                        <a>Seleccione el estado del caso:</a>
                        <select class="form-select" name="newlink" id="newlink">
                            <option selected>${casos[i].link}</option>
                            <option>Cerrado</option>
                            <option>En espera</option>
                        </select>                            
                    </div>
                    <br>
                    <div class="form">
                        <textarea id="newdescripcion1" class="form-control" placeholder="${casos[i].descripcion1}"></textarea>
                    </div>
                    <br>

                    <button class="btn btn-success" onclick="actualizar('${i}')">Actualizar</button>
                    <button class="btn btn-primary" onclick="vistaprincipal()">Regresar</button>

                </form>
                </div>
            </div>
            `
        }
    }
}

//Funcion Actualizar
function actualizar(i){
    let casos = JSON.parse(localStorage.getItem("Casos"));
    casos[i].tipo = document.getElementById("newtipo").value;
    casos[i].fecha = document.getElementById("newfecha").value;
    casos[i].titular = document.getElementById("newtitular").value;
    casos[i].descripcion1 = document.getElementById("newdescripcion1").value;
    casos[i].link = document.getElementById("newlink").value;
    casos[i].lugar = document.getElementById("newlugar").value;

    if(casos[i].fecha == ""){
        alert("⚠️ No ha ingresado la fecha, registro no guardado ⚠️");
    }else{
        if(casos[i].titular==""){
            alert("⚠️ No ha ingresado el cliente, registro no guardado ⚠️");
        }else{
            if(casos[i].lugar==""){
                alert("⚠️ No ha ingresado el abogado, registro no guardado ⚠️");
            }else{
                if(casos[i].tipo==""){
                    alert("⚠️ No ha ingresado el tipo de caso, registro no guardado ⚠️");
                }else{
                    if(casos[i].link==""){
                        alert("⚠️ No ha ingresado el estado, registro no guardado ⚠️");
                    }else{
                        if(casos[i].descripcion1==""){
                            alert("⚠️ No ha ingresado la descripción, registro no guardado ⚠️");
                        }else{
                            localStorage.setItem("Casos",JSON.stringify(casos));
                            //vistaPrincipal();
                        }
                    }
                }
            }
        }
    }
}

//Funcion Eliminar
function eliminar(titular){
    let casos = JSON.parse(localStorage.getItem("Casos"));
    for(let i=0; i<casos.length; i++){
        if(casos[i].titular === titular){
            casos.splice(i,1);
        }
    }

    localStorage.setItem("Casos",JSON.stringify(casos));
    leer();
}

//Funcion para mostrar la interfaz principal
function vistaPrincipal(){
    document.getElementById("body").innerHTML =
    `
        <div class="container mt-4" id="body">
        <div class="row">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header">
                        <h2>Agregar nuevo caso</h2>
                    </div>
                    <!--Registro de casos-->
                    <div class="card-body">
                        <form id="formulario">
                            <br>
                            <div class="form-group">
                                <a>Seleccione la fecha: </a>
                                <input type="date" id="fecha" class="form-control" placeholder="Ingresar fecha">
                            </div>
                            <br>
                            <div class="form-group">
                                <a>Seleccione el cliente:</a>
                                <select class="form-select" name="titular" id="titular">
                                    <option selected>Cliente 1</option>
                                    <option>Cliente 2</option>
                                    <option>Cliente 3</option>
                                    <option>Cliente 4</option>
                                    <option>Cliente 5</option>
                                </select>
                            </div>
                            <br>
                            <div class="form-group">
                                <a>Seleccione el abogado:</a>
                                <select class="form-select" name="lugar" id="lugar">
                                    <option selected>Abogado 1</option>
                                    <option>Abogado 2</option>
                                    <option>Abogado 3</option>
                                    <option>Abogado 4</option>
                                    <option>Abogado 5</option>
                                </select>
                            </div>
                            <br>
                            <div class="form-group">
                                <a>Seleccione el tipo de caso:</a>
                                <select class="form-select" name="tipo" id="tipo">
                                    <option selected>Tipo 1</option>
                                    <option>Tipo 2</option>
                                    <option>Tipo 3</option>
                                    <option>Tipo 4</option>
                                    <option>Tipo 5</option>
                                </select>
                            </div>
                            <br>
                            <div class="form-group">
                                <a>Seleccione el estado del caso:</a>
                                <select class="form-select" name="link" id="link">
                                    <option selected>Activo</option>
                                    <option>Cerrado</option>
                                    <option>En espera</option>
                                </select>                            
                            </div>
                            <br>
                            <div class="form">
                                <textarea id="descripcion1" class="form-control" placeholder="Ingresar descripción"></textarea>
                            </div>
                            <br>
                            <br>
                                <!--Boton Agregar-->
                                <button type="submit" class="btn btn-success">Agregar</button>
                                <a href="oficinavirtual.html" class="btn btn-primary">Regresar</a>
                                <br><br>
                                <a href="index.html" class="px-2 py-2 mr-md-1 rounded"><span class="ion-logo-facebook mr-2"></span>Cerrar sesión</a>
                        </form>
                    </div>

                </div>

            </div>
            <!--Columnas de lectura de registros-->
            <div class="col-md-7">
                <table class="table">
                    <thead class="thead-light">
                    <tr>
                        <th scope="col">Check</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Abogado</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Descripción</th>
                    </tr>
                    </thead>
                    <tbody id="tbody">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `
    leer();
}

leer();