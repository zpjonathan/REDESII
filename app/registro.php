<?php
include 'conexion.php';

$password = password_hash($_POST['password'], PASSWORD_DEFAULT);//hash de la contraseña
//preparacion de la consulta sql
$query = $conexion->prepare('insert into usuarios (nombre, email, password) values (:nombre, :email, :pass)');
//vinculando los valores
$query->bindValue(':pass', $password, PDO::PARAM_STR);
$query->bindValue(':nombre', $_POST['nombre'], PDO::PARAM_STR);
$query->bindValue(':email', $_POST['email'], PDO::PARAM_STR);
$query->execute();// ejecuta la consulta

if ($query->execute()) { //redireccion de la cosulta si fue exitosa
    
    if(0 == 0){
        header("Location: ../index.php");
    }
    
    // Redirigir al usuario a la página de inicio después de registrar
    exit(); // Asegurar que el script se detenga después de la redirección
} else {
    echo "Hubo un error al registrar el usuario.";
}
?>
