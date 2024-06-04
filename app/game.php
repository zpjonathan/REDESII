<?php
include 'conexion.php';// Incluir el archivo de conexión a la base de datos

session_start();// inicio de la sesion 
// Obtener el usuario de la sesión si está disponible, de lo contrario, asignar un array vacío
$usuario = $_SESSION['usuario'] ?? '[]';
$usuario = unserialize($usuario); // Deserializar el usuario

if(isset($usuario->id)){// Verificar si el usuario tiene un ID (está autenticado)
    // Preparar la consulta SQL para actualizar los puntos y juegos del usuario
    $query = $conexion->prepare('update usuarios set puntos = puntos + :puntos, juegos = juegos + 1 where id = :id');
    // Asignar los valores a los parámetros de la consulta
    $query->bindValue(':puntos', $_POST['puntos'], PDO::PARAM_INT);
    $query->bindValue(':id', $usuario->id, PDO::PARAM_STR);
    //ejecuta la consulta
    $query->execute();
     // Devolver '00' si la operación es exitosa
    echo '00';
}else{
    // Devolver un mensaje de error si la sesión ha expirado
    echo 'Sesión expirada';
}

