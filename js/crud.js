var nuevoId;
var db=openDatabase("itemDB","1.0","itemDB",65535);

function limpiar(){
    document.getElementById("item").value="";
    document.getElementById("precio").value="";
}

//Funcionalidad de botones con jquery
//Eliminar registro
function eliminarRegistro(){
    alert("hola");
    //minuto del video 7:20 parte 3
}
$(function(){
    // crear tabla de productos
    $("#crear").click(function(){
        db.transaction(function(transaction){
            var sql="CREATE TABLE productos"+"( id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "+
            "item VARCHAR(100) NOT NULL, "+
            "precio DECIMAL(5,2) NOT NULL)";
            transaction.executeSql(sql,undefined, function(){
                alert("tabla creada exitosamente");

            }, function(transaction, err){
                alert(err.message);
            })
        });
    });

//función mostrar y actualizar
$("#listar").click(function(){
    cargarDatos();
})

function cargarDatos(){
    $("#listaProductos").children().remove();
    db.transaction(function(transaction){
        var sql="SELECT * FROM productos ORDER BY id DESC";
        transaction.executeSql(sql, undefined, function(transaction,result){
            if(result.rows.length){
                $("#listaProductos").append('<tr><th>Código</th><th>Producto</th><th>Precio</th><th></th><th></th></tr>');
                for(var i=0;i<result.rows.length;i++){
                    //variable para renderizar tabla correctamente
                    //contenido de cada fila
                    var row=result.rows.item(i);
                    //para el item como tal
                    var item=row.item;
                    // para id
                    var id=row.id;
                    // para el precio
                    var precio=row.precio;
                    $("#listaProductos").append('<tr id="fila'+id+'"class="Reg_A'+id+'"><td><span class="mid">A'+
                    id+'</span></td><td><span>'+item+'</span></td><td><span>'+precio+' $MX</span></td><td><button class="btn btn-light"><img src="./img/edit.png"></button></td><td><button class="btn btn-light" onclick="eliminarRegistro()"><img src="./img/delete.png"></button></td></tr>');
                }
            }
            else{
                $("#listaProductos").append('<tr><td colspan="5" align="center">No existen registros de productos</td></tr>')
            }
        }, function(transaction, err){
            alert(err.message);
        })
    })
}

$("#insertar").click(function(){
    //llamando a los valores del formulario con id item y precio
    var item=$("#item").val();
    var precio=$("#precio").val();
    // insertar los valores a la base de datos para hacer la transacción
    db.transaction(function(transaction){
        //instrucción sql siempre va en parentesis
        var sql="INSERT INTO productos(item,precio) VALUES(?,?)";
        transaction.executeSql(sql,[item,precio],function(){
        }, function(transaction,err){
            alert(err.message);
        })
    })
    //llando funcion limpíar decretada al inicio de todo, para evitar duplicados
    limpiar();
    //cargar datos para ver automaticamente
    cargarDatos();
});

//función para borrar toda la tabla
$("#eliminarTodo").click(function(){
    if(!confirm("Estás seguro de borrar toda la tabla, los datos se perderán permanentemente",""))
    return;
    //transacción para borrar todo
    db.transaction(function(transaction){
        var sql="DROP TABLE productos";
        transaction.executeSql(sql,undefined,function(){
            alert("Tabla borrada satisfactoriamente, por favor actualice la página")
        }, function(transaction, err){
            alert(err.message);
        })
    })
})

})