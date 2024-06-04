<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    

    <style>
        body{
            background-color: black;
            display: flex;
            justify-content: center;
        }

        h1{
            color: red;
        }
    </style>
    
</head>
<body>

    <div class="col-xl-11 col-md-11 col-sm-12 m-auto">
        <div class="row">
            <div class="col-xl-9 col md 9 col-sm-12 text-center">
                <img src="imagens/fondomenu1.png" alt="">
                <h1 class="text-center mt-2">¡Bienvenidos!</h1>
            </div>

            <div class="col-xl-3 col-md-3 col-sm-12 mt-5" onclick="play()">
                <img src="imagens/botonplay1.jpg">
            </div>
        </div>
        
    </div>

    <script>
        function play(){
            location.href = 'game.php';
        }
    </script>
    
</body>
</html>