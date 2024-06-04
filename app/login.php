<?php
include 'conexion.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si se enviaron los datos del formulario
    if(isset($_POST['Correo']) && isset($_POST['Clave'])) {
        // Obtener los datos del formulario
        $email = $_POST['Correo'];
        $password = $_POST['Clave'];

        // Cifrar la contraseña proporcionada
        $password_cifrada = password_hash($password, PASSWORD_DEFAULT);

        // Consultar la base de datos para obtener la información del usuario
        $query = $conexion->prepare('SELECT * FROM usuarios WHERE email = :email');
        $query->bindValue(':email', $email, PDO::PARAM_STR);
        $query->execute();
        $info = $query->fetch(PDO::FETCH_OBJ);

        // Verificar si se encontró información y si la contraseña coincide
        if ($info && password_verify($password, $info->password)) {
            $_SESSION['usuario'] = serialize($info);
            header("Location: ../main.php");
            exit();
        } else {
            echo '<script>
            alert("Usuario o contraseña incorrecta");
            window.location.href = "../index.php";
          </script>';
    
        }
    } else {
        $error = 'Por favor, complete todos los campos';
        header("Location: login_form.html?error=$error");
        exit();
    }
}
?>
