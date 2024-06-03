<?php 
//configuracion de la conexion de la base de datos con sus campos
$host = 'localhost';
$dbname = 'juegos';
$usuario = 'root';
$password = 'admin';
//crea conexion a la base de datos
$conexion = new PDO("mysql:host=$host;dbname=$dbname", $usuario, $password);
// Establecer el modo de error de PDO para que las excepciones 
$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

/**PDO (PHP Data Objects) es una extensión de PHP 
 * que define una interfaz ligera y consistente para 
 * acceder a bases de datos en PHP. PDO proporciona una
 *  abstracción para las operaciones de base de datos,
 *  lo que significa que puedes utilizar la misma interfaz 
 * para interactuar con diferentes sistemas de gestión de bases
 *  de datos (DBMS), 
 * como MySQL, PostgreSQL, SQLite, etc */