//registro php

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/registro.css" />
    <title>Document</title>
</head>
<body>
<section>
    <form method="post" action="app/registro.php" name="registro_form">
        <h1>Registro de usuario</h1>
        <div class="inputbox">
            <ion-icon name="person-outline"></ion-icon>
            <input type="text" name="nombre" placeholder="Nombre" required>
        </div>
        <div class="inputbox">
            <ion-icon name="mail-outline"></ion-icon>
            <input type="email" name="email" placeholder="Correo electrónico" required>
        </div>
        <div class="inputbox">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input type="password" name="password" placeholder="Contraseña" required>
        </div>
        <div class="button-container">
            <button type="submit" id="aceptar-button" name="aceptar-button">Aceptar</button>
            <button type="button" id="regresar-button" name="regresar-button">Regresar</button>
        </div>
    </form>
</section>
<script>
    document.getElementById("regresar-button").addEventListener("click", function () {
        history.back();
    });
</script>
</body>
</html>