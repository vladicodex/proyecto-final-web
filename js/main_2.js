var iteracion = 0;

document.getElementById("formulario-2").addEventListener("submit", crear);

//Funcion crear
function crear(e){
    customerId = document.getElementById("customerId").value
    customerName = document.getElementById("customerName").value
    customerLastname = document.getElementById("customerLastname").value
    customerEmail = document.getElementById("customerEmail").value
    customerPhone = document.getElementById("customerPhone").value
    customerCellphone = document.getElementById("customerCellphone").value
    customerLocation = document.getElementById("customerLocation").value
    customerStatus = document.getElementById("customerStatus").value

    let cliente = {
        customerId,
        customerName,
        customerLastname,
        customerEmail,
        customerPhone,
        customerCellphone,
        customerLocation,
        customerStatus
    }

    if(localStorage.getItem("Clientes") === null){
        let clientes = []
        clientes.push(cliente)
        localStorage.setItem("Clientes",JSON.stringify(clientes))
    }else{
        let clientes = JSON.parse(localStorage.getItem("Clientes"))
        clientes.push(cliente)
        localStorage.setItem("Clientes",JSON.stringify(clientes))
    }
    leer();
    document.getElementById("formulario-2").reset();
    alert("Cliente guardado correctamente");
    e.preventDefault();
}


//Funcion leer2
function leer2(){
    let clientes = JSON.parse(localStorage.getItem("Clientes"));
    document.getElementById("tbody-2").innerHTML = ""
    for(let i=0; i < clientes.length; i++){

        let customerId = clientes[i].customerId
        let customerName = clientes[i].customerName
        let customerLastname = clientes[i].customerLastname
        let customerEmail = clientes[i].customerEmail
        let customerPhone = clientes[i].customerPhone
        let customerCellphone = clientes[i].customerCellphone
        let customerLocation = clientes[i].customerLocation
        let customerStatus = clientes[i].customerStatus

        document.getElementById("tbody-2").innerHTML +=
        `
        <tr>
            <td>${customerId}</td>
            <td>${customerName}</td>
            <td>${customerLastname}</td>
            <td>${customerEmail}</td>
            <td>${customerPhone}</td>
            <td>${customerCellphone}</td>
            <td>${customerLocation}</td>
            <td>${customerStatus}</td>
            <td><button onclick="eliminar('${customerId}')" class="btn btn-danger">Eliminar</button></td>
            <td><button onclick="editar('${customerId}')" class="btn btn-secondary">Editar</button></td>
        </tr>`
    }
}

//Funcion editar
function editar(customerId){
    let clientes = JSON.parse(localStorage.getItem("Clientes"));
    for(let i=0; i<clientes.length; i++){
        if(clientes[i].customerId === customerId){
            document.getElementById("body-2").innerHTML =
            `
            <div class="card">
            <div class="card-header">
                <h2>Agregar nuevo cliente</h2>
            </div>
            <!--Registro de casos-->
            <div class="card-body">
                <form id="formulario-2">
                    <br>
                    <div class="form-group">
                        <input type="number" id="newcustomerId" class="form-control" placeholder="${clientes[i].customerId}" required>
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="text" id="newcustomerName" class="form-control" placeholder="${clientes[i].customerName}" required>
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="text" id="newcustomerLastname" class="form-control" placeholder="${clientes[i].customerLastname}" required>
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="email" id="newcustomerEmail" class="form-control" placeholder="${clientes[i].customerEmail}" required>
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="number" id="newcustomerPhone" class="form-control" placeholder="${clientes[i].customerPhone}" required>
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="number" id="newcustomerCellphone" class="form-control" placeholder="${clientes[i].customerCellphone}" required>
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="text" id="newcustomerLocation" class="form-control" placeholder="${clientes[i].customerLocation}" required>
                    </div>
                    <br>
                    <div class="form-group">
                        <select class="form-select" name="newcustomerStatus" id="newcustomerStatus" required>
                            <option selected>${clientes[i].customerStatus}</option>
                            <option>Casado</option>
                            <option>En espera</option>
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
    let clientes = JSON.parse(localStorage.getItem("Clientes"));
    clientes[i].customerId = document.getElementById("newcustomerId").value;
    clientes[i].customerName = document.getElementById("newcustomerName").value;
    clientes[i].customerLastname = document.getElementById("newcustomerLastname").value;
    clientes[i].customerEmail = document.getElementById("newcustomerEmail").value;
    clientes[i].customerPhone = document.getElementById("newcustomerPhone").value;
    clientes[i].customerCellphone = document.getElementById("newcustomerCellphone").value;
    clientes[i].customerLocation = document.getElementById("newcustomerLocation").value;
    clientes[i].customerStatus = document.getElementById("newcustomerStatus").value;


    if(clientes[i].customerId == ""){
        alert("⚠️ No ha ingresado el ID, registro no guardado ⚠️");
    }else{
        if(clientes[i].customerName==""){
            alert("⚠️ No ha ingresado el NOMBRE, registro no guardado ⚠️");
        }else{
            if(clientes[i].customerLastname==""){
                alert("⚠️ No ha ingresado el APELLIDO, registro no guardado ⚠️");
            }else{
                if(clientes[i].customerEmail==""){
                    alert("⚠️ No ha ingresado el EMAIL, registro no guardado ⚠️");
                }else{
                    if(clientes[i].customerPhone==""){
                        alert("⚠️ No ha ingresado el TELEFONO, registro no guardado ⚠️");
                    }else{
                        if(clientes[i].customerCellphone==""){
                            alert("⚠️ No ha ingresado el CELULAR, registro no guardado ⚠️");
                        }else{
                            localStorage.setItem("Clientes",JSON.stringify(clientes));
                            //vistaPrincipal();
                        }
                    }
                }
            }
        }
    }
}

//Funcion Eliminar
function eliminar(customerId){
    let clientes = JSON.parse(localStorage.getItem("Clientes"));
    for(let i=0; i<clientes.length; i++){
        if(clientes[i].customerId === customerId){
            clientes.splice(i,1); //OJO -> Revisar esta función
        }
    }

    localStorage.setItem("Clientes",JSON.stringify(clientes));
    leer2();
}

//Funcion para mostrar la interfaz principal
function vistaPrincipal2(){
    document.getElementById("body-2").innerHTML =
    `
    <div class="container mt-4" id="body-2">
        <div class="row">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header">
                        <h2>Agregar nuevo cliente</h2>
                    </div>
                    <!--Registro de casos-->
                    <div class="card-body">
                        <form id="formulario-2">
                            <br>
                            <div class="form-group">
                                <input type="number" id="customerId" class="form-control" placeholder="Ingresar cédula" required>
                            </div>
                            <br>
                            <div class="form-group">
                                <input type="text" id="customerName" class="form-control" placeholder="Ingresar nombre" required>
                            </div>
                            <br>
                            <div class="form-group">
                                <input type="text" id="customerLastname" class="form-control" placeholder="Ingresar apellido" required>
                            </div>
                            <br>
                            <div class="form-group">
                                <input type="email" id="customerEmail" class="form-control" placeholder="Ingresar correo" required>
                            </div>
                            <br>
                            <div class="form-group">
                                <input type="number" id="customerPhone" class="form-control" placeholder="Ingresar teléfono" required>
                            </div>
                            <br>
                            <div class="form-group">
                                <input type="number" id="customerCellphone" class="form-control" placeholder="Ingresar celular" required>
                            </div>
                            <br>
                            <div class="form-group">
                                <input type="text" id="customerLocation" class="form-control" placeholder="Ingresar dirección" required>
                            </div>
                            <br>
                            <div class="form-group">
                                <select class="form-select" name="customerStatus" id="customerStatus" required>
                                    <option selected>Soltero</option>
                                    <option>Casado</option>
                                    <option>En espera</option>
                                </select>                            
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
                        <th scope="col">Cédula</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Celular</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Estado civil</th>
                      </tr>
                    </thead>
                    <tbody id="tbody-2">
                    </tbody>
                  </table>
            </div>
        </div>
    </div>
    `
    leer2();
}

leer2();