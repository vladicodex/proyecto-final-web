var iteracion = 0;

document.getElementById("formulario-3").addEventListener("submit", crear);

//Funcion crear
function crear(e){
    tipoCaso = document.getElementById("tipoCaso").value
    estadoCaso = document.getElementById("estadoCaso").value

    let caso = {
        tipoCaso,
        estadoCaso
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
    document.getElementById("formulario-3").reset();
    alert("Tipo de caso guardado correctamente");
    e.preventDefault();
}


//Funcion leer2
function leer2(){
    let casos = JSON.parse(localStorage.getItem("Casos"));
    document.getElementById("tbody-3").innerHTML = ""
    for(let i=0; i < casos.length; i++){

        let tipoCaso = casos[i].tipoCaso
        let estadoCaso = casos[i].estadoCaso

        document.getElementById("tbody-3").innerHTML +=
        `
        <tr>
            <td>${tipoCaso}</td>
            <td>${estadoCaso}</td>
            <td><button onclick="eliminar('${tipoCaso}')" class="btn btn-danger">Eliminar</button></td>
            <td><button onclick="editar('${tipoCaso}')" class="btn btn-secondary">Editar</button></td>
        </tr>`
    }
}

//Funcion editar
function editar(tipoCaso){
    let casos = JSON.parse(localStorage.getItem("Casos"));
    for(let i=0; i<casos.length; i++){
        if(casos[i].tipoCaso === tipoCaso){
            document.getElementById("body-3").innerHTML =
            `
            <div class="card">
            <div class="card-header">
                <h2>Agregar nuevo cliente</h2>
            </div>
            <!--Registro de casos-->
            <div class="card-body">
                <form id="formulario-3">
                    <br>
                        <div class="form-group">
                            <input type="text" id="newtipoCaso" class="form-control" placeholder="${casos[i].tipoCaso}" required>
                        </div>
                        <br>
                        <div class="form-group">
                            <select class="form-select" name="newestadoCaso" id="newestadoCaso" required>
                                <option selected>${casos[i].estadoCaso}</option>
                                <option>Inhabilitado</option>
                            </select>                            
                        </div>
                    <br>

                    <button class="btn btn-success" onclick="actualizar('${i}')">Actualizar</button>
                    <button class="btn btn-primary" onclick="vistaprincipal2()">Regresar</button>

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
    casos[i].tipoCaso = document.getElementById("newtipoCaso").value;
    casos[i].estadoCaso = document.getElementById("newestadoCaso").value;

    if(casos[i].tipoCaso == ""){
        alert("⚠️ No ha ingresado el TIPO DE CASO, registro no guardado ⚠️");
    }else{
        if(casos[i].estadoCaso==""){
            alert("⚠️ No ha ingresado el ESTADO DEL CASO, registro no guardado ⚠️");
        }else{
                localStorage.setItem("Casos",JSON.stringify(casos));
                //vistaPrincipal();
        }
    }
}

//Funcion Eliminar
function eliminar(tipoCaso){
    let casos = JSON.parse(localStorage.getItem("Casos"));
    for(let i=0; i<casos.length; i++){
        if(casos[i].tipoCaso === tipoCaso){
            casos.splice(i,1); //OJO -> Revisar esta función
        }
    }

    localStorage.setItem("Casos",JSON.stringify(casos));
    leer2();
}

//Funcion para mostrar la interfaz principal
function vistaPrincipal2(){
    document.getElementById("body-3").innerHTML =
    `
    <div class="container mt-4" id="body-3">
        <div class="row">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header">
                        <h2>Agregar nuevo tipo de caso</h2>
                    </div>
                    <!--Registro de casos-->
                    <div class="card-body">
                        <form id="formulario-3">
                            <br>
                            <div class="form-group">
                                <input type="text" id="tipoCaso" class="form-control" placeholder="Ingrese el tipo de caso" required>
                            </div>
                            <br>
                            <div class="form-group">
                                <select class="form-select" name="estadoCaso" id="estadoCaso" required>
                                    <option selected>Habilitado</option>
                                    <option>Inhabilitado</option>
                                </select>                            
                            </div>
                            <br>
                            <br>
                                <!--Boton Agregar-->
                                <button type="submit" class="btn btn-success">Agregar nuevo tipo de caso</button>
                                <a href="configuracion.html" class="btn btn-primary">Regresar</a>
                                <br><br>
                                <a href="index.html" class="px-2 py-2 mr-md-1 rounded"><span class="ion-logo-facebook mr-2"></span>Cerrar sesión</a>
                        </form>
                    </div>

                </div>

            </div>
            <!--Columnas de lectura de registros-->
            <div class="col-md-4">
                <table class="table">
                    <thead class="thead-light">
                      <tr>
                        <th scope="col">Tipo de caso</th>
                        <th scope="col">Estado</th>
                      </tr>
                    </thead>
                    <tbody id="tbody-3">
                    </tbody>
                  </table>
            </div>
        </div>
    </div>
    `
    leer2();
}

leer2();