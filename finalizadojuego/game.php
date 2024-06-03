<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dominos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/game.css">
</head>

<body>
    <?php 
        session_start();
        $datos = $_SESSION['usuario'] ?? '';
        if(isset($datos)){
            $datos = unserialize($datos);
        }
    ?>

    <div class="timer"><strong id="timer">03:00</strong></div>
    <div class="score"><strong>Puntos: <span id="score">0</span></strong></div>

    <div id="prueba" hidden></div>

    <div id="hiddenDomino" hidden>
        <div class="img-container">
            <div class="d-flex justify-content-center">
                <div class="numero-domino top top1 unselected-item"></div>
                <div class="numero-domino top top2 unselected-item"></div>
            </div>
            <div class="d-flex justify-content-center">
                <div>
                    <div class="numero-domino left left1 unselected-item"></div>
                </div>
                <div class="container-item">
                    <div class="horizontal-domino-item d-flex justify-content-between">
                        <div class="domino-number-item">
                            <div class="d-flex justify-content-center internal-number"></div>
                            <div class="d-flex justify-content-center internal-number"></div>
                            <div class="d-flex justify-content-center internal-number"></div>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="horizontal-separator"></div>
                        </div>
                        <div class="domino-number-item">
                            <div class="d-flex justify-content-center internal-number"></div>
                            <div class="d-flex justify-content-center internal-number"></div>
                            <div class="d-flex justify-content-center internal-number"></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="numero-domino right right1 unselected-item"></div>
                </div>
            </div>

            <div class="d-flex justify-content-center">
                <div class="numero-domino bottom1 botttom unselected-item"></div>
                <div class="numero-domino bottom2 botttom unselected-item"></div>
            </div>
        </div>

        <div class="img-container">
            <div class="d-flex justify-content-center">
                <div class="numero-domino top top1 unselected-item"></div>
            </div>
            <div class="d-flex justify-content-center">
                <div>
                    <div class="numero-domino left left1 unselected-item"></div>
                    <div class="numero-domino left left2 unselected-item"></div>
                </div>
                <div class="container-item">
                    <div class="domino-item">
                        <div class="domino-number-item">
                            <div class="d-flex justify-content-center internal-number"></div>
                            <div class="d-flex justify-content-center internal-number"></div>
                            <div class="d-flex justify-content-center internal-number"></div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <div class="separator"></div>
                        </div>
                        <div class="domino-number-item">
                            <div class="d-flex justify-content-center internal-number"></div>
                            <div class="d-flex justify-content-center internal-number"></div>
                            <div class="d-flex justify-content-center internal-number"></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="numero-domino right right1 unselected-item"></div>
                    <div class="numero-domino right right2 unselected-item"></div>
                </div>
            </div>

            <div class="d-flex justify-content-center">
                <div class="numero-domino bottom bottom1 unselected-item"></div>
            </div>
        </div>
    </div>

    <div class="contenedor">
        <div class="img-container first d-none" id="firstDomino" primero="0" segundo="0">
            <div class="d-flex justify-content-center">
                <div class="numero-domino top unselected-item"></div>
            </div>
            <div class="d-flex justify-content-center">
                <div>
                    <div class="numero-domino left1 unselected-item"></div>
                    <div class="numero-domino left2 unselected-item"></div>
                </div>
                <div class="container-item">
                    <div class="domino-item">
                        <div class="domino-number-item">
                            <div class="d-flex justify-content-center internal-number"></div>
                            <div class="d-flex justify-content-center internal-number"></div>
                            <div class="d-flex justify-content-center internal-number"></div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <div class="separator"></div>
                        </div>
                        <div class="domino-number-item">
                            <div class="d-flex justify-content-center internal-number"></div>
                            <div class="d-flex justify-content-center internal-number"></div>
                            <div class="d-flex justify-content-center internal-number"></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="numero-domino right1 unselected-item"></div>
                    <div class="numero-domino right2 unselected-item"></div>
                </div>
            </div>

            <div class="d-flex justify-content-center">
                <div class="numero-domino bottom unselected-item"></div>
            </div>
        </div>
    </div>


    <div class="footer d-flex">
        <div class="d-flex mt-auto" id="lstdominos">
        </div>
    </div>
    <?php
        if(isset($datos->id)){ ?>
            <button class="btn btn-primary btn-iniciar" id="btnIniciar" type="button" onclick="start()">Iniciar</button>
        <?php }
    ?>

    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <script src="js/game.js"></script>
    <script> set_juegos(<?= $datos->juegos ?? 0 ?>)</script>
</body>

</html>