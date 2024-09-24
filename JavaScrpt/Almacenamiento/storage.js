function iniciar(){
    var boton = document.getElementById("grabar");
    boton.addEventListener('click',nuevoItem);
    mostrar();
}

function nuevoItem(){
    var clave = document.getElementById("clave").value;
    var valor = document.getElementById("texto").value;
    sessionStorage.setItem(clave,valor);
    document.getElementById("clave").value = "";
    document.getElementById("texto").value = ""; 
    mostrar(clave);
}

//Leer el dato cargado, lee el utlimo, ya que la sesion guardo el ultimo
/*function mostrar(clave){
    var cajadatos = document.getElementById("cajadatos");
    var valor = sessionStorage.getItem(clave);
    cajadatos.innerHTML = '<div>'+clave+' - '+valor+'</div>';
    var clave = document.getElementById("clave");
    clave.innerHTML = "";

    var texto = document.getElementById("texto");
    texto.innerHTML = ""; 
}*/

addEventListener('load',iniciar);

//Lo que cargo en una session no se guarda en la otra sesion

function mostrar(){
    var cajadatos = document.getElementById("cajadatos");
    cajadatos.innerHTML = '';
    if(sessionStorage.length > 0){
        cajadatos.innerHTML = '<div><input type="button" onclick ="eliminartTodo()" value="eliminar"</div>';
    }
    for(var i=0; i<sessionStorage.length; i++){
        var clave = sessionStorage.key(i);
        var valor = sessionStorage.getItem(clave);
        cajadatos.innerHTML += '<div>'+clave+' - '+valor+'<br><input type="button" onclick="eliminar(\'' + clave + '\')" value="Eliminar"</div>';
    }
    cajadatos.innerHTML += '</div>';
}

function eliminar(clave){
    if(confirm("Esta seguro?")){
        sessionStorage.removeItem(clave);
        mostrar();
    }
}

function eliminartTodo(){
    if(confirm("Esta seguro de elminar todo?")){
        sessionStorage.clear();
        mostrar();
    }
}


