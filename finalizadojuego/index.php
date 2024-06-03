<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/login.css" />
    <title>Document</title>
</head>

<body>

    <section>
    <form method="post" action="app/login.php">
            <h1>Inicio</h1>
            
            <div class=" inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input type="email" name="Correo" placeholder="Usuario" required>
            </div>

            <div class="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input type="password" name="Clave" placeholder="Contraseña" required>
            </div>

            <div class="forget">
                <label for=""><input type="checkbox">Recordar</label>
                <a href="#">Olvide la contraseña</a>
            </div>

            <button type="submit">Iniciar</button>
            <div class="register">
                <div class="register">
                <p>No tengo una cuenta <a href="registro.php">Regístrate</a></p>
                </div>
            </div>
        </form>
    </section>
</body>

</html>
