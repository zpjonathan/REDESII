let selectedDomino; /** vairiable para almacenar la pieza seleccionada */
let currentDomino;/** variable  para la pieza actual */
let puntos = 0; /** se decara una variable en cero para que esto almacene  los puntos del jugador */
let x; /** posicion en x de la pieza */
let y;
let deleteSelected; /** variable que sera para eliminar la clase seleccionada */
let interval;/** variable para ek identificador de intervalo */
let firstItem = $('.contenedor').html(); /**inicia el html inicial del contenedor */
let juegos = 0;/**numeros de  juegos jugados */

let numerosDomino = [
    /** array , numero de combinacion del domino */
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 6],
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
    [4, 4],
    [4, 5],
    [4, 6],
    [5, 5],
    [5, 6],
    [6, 6]
];

let lstDominos = [
    /**array del html que representa cada posible numero del domino */
    '<div class="domino-number-item"><div class="d-flex justify-content-center internal-number"></div><div class="d-flex justify-content-center internal-number"></div><div class="d-flex justify-content-center internal-number"></div></div>',
    '<div class="domino-number-item"><div class="d-flex justify-content-center internal-number"></div><div class="d-flex justify-content-center internal-number"><div class="point"></div></div><div class="d-flex justify-content-center internal-number"></div></div>',
    '<div class="domino-number-item"><div class="d-flex justify-content-end internal-number"><div class="point"></div></div><div class="d-flex justify-content-center internal-number"></div><div class="d-flex justify-content-start internal-number"><div class="point"></div></div></div>',
    '<div class="domino-number-item"><div class="d-flex justify-content-end internal-number"><div class="point"></div></div><div class="d-flex justify-content-center internal-number"><div class="point"></div></div><div class="d-flex justify-content-start internal-number"><div class="point"></div></div></div>',
    '<div class="domino-number-item"><div class="d-flex justify-content-between internal-number"><div class="point"></div><div class="point"></div></div><div class="d-flex justify-content-center internal-number"></div><div class="d-flex justify-content-between internal-number"><div class="point"></div><div class="point"></div></div></div>',
    '<div class="domino-number-item"><div class="d-flex justify-content-between internal-number"><div class="point"></div><div class="point"></div></div><div class="d-flex justify-content-center internal-number"><div class="point"></div></div><div class="d-flex justify-content-between internal-number"><div class="point"></div><div class="point"></div></div></div>',
    '<div class="domino-number-item"><div class="d-flex justify-content-between internal-number"><div class="point"></div><div class="point"></div></div><div class="d-flex justify-content-between internal-number"><div class="point"></div><div class="point"></div></div><div class="d-flex justify-content-between internal-number"><div class="point"></div><div class="point"></div></div></div>'
];
/**evento de click  para la pieza del domino selecionado */
$('body').on('click', '.numero-domino.selected-item', function () {

/**remueve la clase de seleccion */
    $(`.contenedor .img-container`).removeClass('selected-img-container, overitem');
    $(`.contenedor .numero-domino`).removeClass('selected-item');

    let coordenadas = $(this).offset();/**obiene las coordenadas del domino */
/**obtiene los elemento   dado el cursor */
    var overElements = document.elementsFromPoint(coordenadas.left, coordenadas.top);
    let numeros = $(overElements).filter('.numero-domino');/** remueve la class domino superpuesto */

    numeros.each(function(){
        /**asigna el domino actual */
        if($(this).closest('.img-container').length > 0){
            currentDomino = $(this).closest('.img-container');
            return false;
        }
    });
    /**asigna los puntos del domino  cuando se coloca las piezas */
    puntos += 5;
    $('#score').html(puntos);/**actualiza los puntaje del html */

    let clases = $(this).attr('class');/**obtiene el domino selescionado */
    x = coordenadas.left; /**coordenada x */
    y = coordenadas.top;/**coordenada y */
    deleteSelected = '.top';/** elima  la clase por defecto */

    /**determina la posicion del domino y llama la funcion que corresponde */
    if (clases.includes('top')) {
        topItem();
    } else if (clases.includes('bottom')) {
        bottomItem();
    } else if (clases.includes('left')) {
        leftItem(clases);
    } else if (clases.includes('right')) {
        rightItem(clases);
    }

    $(this).removeClass('numero-domino');/**remuve la class del domino seleccionado */
    selectedDomino.find(deleteSelected).removeClass('numero-domino');
    $('.contenedor').append(selectedDomino);/** añade al domino seleccinado al contenedor */

    selectedDomino.css({
        /**nueva posicion del domino selecionado */
        position: 'absolute',
        left: x + 'px',
        top: y + 'px'
    })
    /** obtiene los elementos   seleccionado en el cursor */
    var overElements = document.elementsFromPoint(coordenadas.left, coordenadas.top);
    $(overElements).filter('.numero-domino').removeClass('numero-domino');/**remueve le domino que se sobrepone */
    $('.contenedor .over-selected').replaceWith('');/**reemplaza los elementos superpuesto */

    if($('#lstdominos .img-container').length == 0){/**  si existe algun domino en la sita de domino */
        let puntuacionAdcional = $('#timer').html();/** timer  tiempo restante del juego */
        let tiempo = puntuacionAdcional.split(':');/** divide el tiempo en min;seg */
        puntos += ( (parseInt(tiempo[0]) * (50)) + ( Math.round(parseInt(tiempo[1]) / 6) * (5) ) );/**calcula tiempo adicional */
        $('#score').html(puntos);/** actualiza el puntaje en  el html */

        setTimeout(() => {
            finalizar_juego($('#timer')); /** finalizacion de juego */
        }, 2000);
    }
});

$('body').on('click', '#lstdominos .domino', function () {/**evento de click para un domino en la lista */
    $('#lstdominos .domino').removeClass('selected');/**remeve la clase de seleccion de todos los domino */
    $('.contenedor .over-selected').replaceWith('');/**reemplaza los elementos superpuesto */
    $(`.contenedor .img-container`).removeClass('selected-img-container');/**remuve la clase de seleccion */
    $(`.contenedor .numero-domino`).removeClass('selected-item');

    $(this).addClass('selected');/**añade la clase de selecion al domino que se hace clik */
    selectedDomino = $(this).closest('.img-container');/***se le asigna al domino selecionado */
    let primero = selectedDomino.attr('primero');/**obtiene el primer numero del domino */
    let segundo = selectedDomino.attr('segundo');/**segundo  numero del domino */


/** obtiene los dominos activo con  el primer y segundo numero */
    let lstActivePrimero = $(`.contenedor .numero-domino.domino${primero}`);
    let lstActiveSegundo = $(`.contenedor .numero-domino.domino${segundo}`);

/** añade la clase de seleccion a los contenedores correspondiente */
    lstActivePrimero.closest('.img-container').each(function () {
        $(this).addClass('selected-img-container');
    });

    lstActiveSegundo.closest('.img-container').each(function () {
        if (!$(this).hasClass('selected-img-container')) {
            $(this).addClass('selected-img-container');
        }
    });

    lstActivePrimero.addClass('selected-item');/**añade las clases de seleccion activa */
    lstActiveSegundo.addClass('selected-item');
/** itera sobre los elemetos  dentro del contenedor */
    $('.contenedor .selected-img-container .right1, .contenedor .selected-img-container .left1').each(function () {
       /** añade la clase  unselected a los elementos que no tienen  la class selected item */
        if (!$(this).hasClass('selected-item')) {
            $(this).addClass('unselected-item');
        }
    });
/**limpia el contenido del elemento id #prueva */
    $('#prueba').html('');
    let selectedItems = $('.selected-item'); /**se obtiene los elementos con la clase selected item */
    let coordenadas;/**  variable  que obtiene  las cooordenadas del domino */

/**itera sobre cada elemento seleccionado para obtener  sus coordenadas  y clonarlo */
    selectedItems.each(function(){
        coordenadas = $(this).offset();/**obtiene  la posicion de cada elementos seleccionado */
        /**clona el elemento seleccioado  y lo inserta  en el dom */
        $('#prueba').html($(this).clone());
        $('#prueba .numero-domino').addClass('over-selected'); /**añiade la clase over selected al clone */
       /**estableciendo la poisicion del clon para que coincida con el elemto original */
        $('#prueba .numero-domino').css({
            position: 'absolute',
            left: coordenadas.left + 'px',
            top: coordenadas.top + 'px'
        })
        /**añiade el clon posicionado al contenedor */
        $('.contenedor').append($('#prueba').html());
    });
});

/**selecciona el segundo contenedor de imagen dentro de img-container */
function topItem() {
    let subcontainer = $('#hiddenDomino .img-container').eq(1);
    let items = [0, 1];/**arreglo para los elementos del domino */
     /**variable para los atributos del domino */
    let primero = 'primero';
    let segundo = 'segundo';

/**verifica si el primer numero del domino seleccionado es igual al primer numero del  domino actual
 * si son iguales invierte el orden de los elementos y los cambia
 */
    if (selectedDomino.attr('primero') == currentDomino.attr('primero')) {
        items = [1, 0];
        primero = 'segundo';
        segundo = 'primero';
    }
/**actuliza el contenido del sub contaniner con los numeros del domino que se seleciona */
    subcontainer.find('.domino-number-item').eq(0).html(selectedDomino.find('.domino-number-item').eq(items[0]).html());
    subcontainer.find('.domino-number-item').eq(1).html(selectedDomino.find('.domino-number-item').eq(items[1]).html());
/**se obtiene los numero seleccionados */
    let primerNumero = selectedDomino.attr(primero);
    let segundoNumero = selectedDomino.attr(segundo);

/**actualiza los atributos del domino seleccionado */
    selectedDomino.attr('primero', primerNumero);
    selectedDomino.attr('segundo', segundoNumero);
/**añiade clases para identificar los numeros en el sub-container */
    subcontainer.find('.top, .left1, .right1').addClass(`domino${primerNumero}`);
    subcontainer.find('.bottom, .left2, .right2').addClass(`domino${segundoNumero}`);
/**reemplaza el contenido  de domino en el conetenedor del sub-container */
    selectedDomino.html(subcontainer.html());
/**remueve las clases ,limpia el sub-conatainer */
    subcontainer.find('.top, .left1, .right1').removeClass(`domino${primerNumero}`);
    subcontainer.find('.bottom, .left2, .right2').removeClass(`domino${segundoNumero}`);
/**ajusta las coordenadas para posicionar el domino seleccionada */
    x -= 40;
    y -= 80;
/**direccion de eliminacion del  domino seleccionado */
    deleteSelected = '.bottom'
}

function leftItem(clases) {
    /**selecciona el primer contenedor de imagen dentro del hiddenDomino */
    let subcontainer = $('#hiddenDomino .img-container').eq(0);
    let items = [0, 1];
    let primero = 'primero';
    let segundo = 'segundo';
    let currentNumber = 'primero'/** variable para el  numero actual del domino */

/**Si las clases incluyen 'left2', cambia el número actual al segundo número del dominó */
    if (clases.includes('left2')) {
        currentNumber = 'segundo';
    }
/**Verifica si el primer número del dominó seleccionado es igual al número actual del dominó */
    if (selectedDomino.attr('primero') == currentDomino.attr(currentNumber)) {
        /**si son iguales invierte el orden */
        items = [1, 0];
        primero = 'segundo';
        segundo = 'primero';
    }
/**actualiza el contenido del sub-conteiner con los numeros del domino seleccionado */
    subcontainer.find('.domino-number-item').eq(0).html(selectedDomino.find('.domino-number-item').eq(items[0]).html());
    subcontainer.find('.domino-number-item').eq(1).html(selectedDomino.find('.domino-number-item').eq(items[1]).html());


    let primerNumero = selectedDomino.attr(primero);
    let segundoNumero = selectedDomino.attr(segundo);

    selectedDomino.attr('primero', primerNumero);
    selectedDomino.attr('segundo', segundoNumero);

    subcontainer.find('.top1, .left, .bottom1').addClass(`domino${primerNumero}`);
    subcontainer.find('.bottom2, .top2, .right').addClass(`domino${segundoNumero}`);

    selectedDomino.html(subcontainer.html());

    subcontainer.find('.top1, .left, .bottom1').removeClass(`domino${primerNumero}`);
    subcontainer.find('.bottom2, .top2, .right').removeClass(`domino${segundoNumero}`);

    x -= 80;
    y -= 40;

    deleteSelected = '.right'
}

function rightItem(clases) {
    /**seleciona el primer elemento con la clase img-container dentro del elemento hidden  */
    let subcontainer = $('#hiddenDomino .img-container').eq(0);
    let items = [0, 1];/**inicia los arreglos  con 0,1 para representar el orden del domino */
    let primero = 'primero';
    let segundo = 'segundo';
    let currentNumber = 'primero'/**inicializa la variable  */

 // Si la lista de clases incluye 'right2' o el dominó actual tiene un elemento con la clase .horizontal-domino-item,
    // entonces cambia currentNumber a 'segundo
    if (clases.includes('right2') || currentDomino.find('.horizontal-domino-item').length > 0) {
        currentNumber = 'segundo';
    }
/**depuracion  para ver si esta funcionando */
    console.log(clases);

    console.log(selectedDomino.attr('segundo'));
    console.log(currentDomino.attr(currentNumber));
     // Si el atributo 'segundo' del dominó seleccionado es igual al atributo currentNumber del dominó actual,
    // invierte el orden de los elementos en items y ajusta las variables primero y segundo
     if (selectedDomino.attr('segundo') == currentDomino.attr(currentNumber)) {
        items = [1, 0];
        primero = 'segundo';
        segundo = 'primero';
    }
// Actualiza el contenido del subcontainer con los números del dominó seleccionado según el orden en items
    subcontainer.find('.domino-number-item').eq(0).html(selectedDomino.find('.domino-number-item').eq(items[0]).html());
    subcontainer.find('.domino-number-item').eq(1).html(selectedDomino.find('.domino-number-item').eq(items[1]).html());
// Obtiene los valores de los atributos 'primero' y 'segundo' del dominó seleccionado
    let primerNumero = selectedDomino.attr(primero);
    let segundoNumero = selectedDomino.attr(segundo);

// Asigna los valores obtenidos a los atributos 'primero' y 'segundo' del dominó seleccionado
    selectedDomino.attr('primero', primerNumero);
    selectedDomino.attr('segundo', segundoNumero);

 // Añade las clases correspondientes a los números del dominó en el subcontainer
    subcontainer.find('.top1, .left, .bottom1').addClass(`domino${primerNumero}`);
    subcontainer.find('.bottom2, .top2, .right').addClass(`domino${segundoNumero}`);

// Reemplaza el contenido del dominó seleccionado con el contenido del subcontainer
    selectedDomino.html(subcontainer.html());
// Limpia el subcontainer eliminando las clases añadidas previamente
    subcontainer.find('.top1, .left, .bottom1').removeClass(`domino${primerNumero}`);
    subcontainer.find('.bottom2, .top2, .right').removeClass(`domino${segundoNumero}`);

// Ajusta las coordenadas x e y para reposicionar el dominó seleccionado
    x -= 40;
    y -= 40;
// Establece la dirección de eliminación del dominó seleccionado a '.left'
    deleteSelected = '.left'
}

function bottomItem() {
    // Selecciona el segundo elemento con la clase .img-container dentro del elemento #hiddenDomino
    let subcontainer = $('#hiddenDomino .img-container').eq(1);
    // Inicializa un arreglo items con los índices 1 y 0 para representar el orden de los números del dominó
    let items = [1, 0];
    let primero = 'primero';
    let segundo = 'segundo';

    // Si el atributo 'primero' del dominó seleccionado es igual al atributo 'segundo' del dominó actual
    // o si el dominó actual tiene un elemento con la clase .horizontal-domino-item, invierte el orden de items
    // y ajusta las variables primero y segundo
    if (selectedDomino.attr('primero') == currentDomino.attr('segundo') || currentDomino.find('.horizontal-domino-item').length > 0) {
        items = [0, 1];
        primero = 'segundo';
        segundo = 'primero';
    }
// Actualiza el contenido del subcontainer con los números del dominó seleccionado según el orden en items
    subcontainer.find('.domino-number-item').eq(0).html(selectedDomino.find('.domino-number-item').eq(items[0]).html());
    subcontainer.find('.domino-number-item').eq(1).html(selectedDomino.find('.domino-number-item').eq(items[1]).html());

    // Obtiene los valores de los atributos 'primero' y 'segundo' del dominó seleccionado
    let primerNumero = selectedDomino.attr(segundo);
    let segundoNumero = selectedDomino.attr(primero);
// Asigna los valores obtenidos a los atributos 'primero' y 'segundo' del dominó seleccionado
    selectedDomino.attr('primero', primerNumero);
    selectedDomino.attr('segundo', segundoNumero);

// Añade las clases correspondientes a los números del dominó en el subcontainer
    subcontainer.find('.top, .left1, .right1').addClass(`domino${primerNumero}`);
    subcontainer.find('.bottom, .left2, .right2').addClass(`domino${segundoNumero}`);

// Reemplaza el contenido del dominó seleccionado con el contenido del subcontainer
    selectedDomino.html(subcontainer.html());

    // Limpia el subcontainer eliminando las clases añadidas previamente
    subcontainer.find('.top, .left1, .right1').removeClass(`domino${primerNumero}`);
    subcontainer.find('.bottom, .left2, .right2').removeClass(`domino${segundoNumero}`);

    // Ajusta las coordenadas x e y para reposicionar el dominó seleccionado
    x -= 40;
    y -= 40;

    // Establece la dirección de eliminación del dominó seleccionado a '.top'
    deleteSelected = '.top'
}

function shuffleArray(array) {
    // Función para mezclar los elementos de un array en un orden aleatorio
    // Recorre el array de atrás hacia adelante
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Genera un índice aleatorio entre 0 y i
        [array[i], array[j]] = [array[j], array[i]]; // Intercambia los elementos en las posiciones i y j
    }
    return array;// array ya mezclado
}
// Función para establecer la cantidad de juegos
function set_juegos(cantidad) {
    juegos = cantidad;
}
// Función para iniciar el juego
function start() {
      // Verifica si el límite de intentos se ha alcanzado
    if (juegos >= 5) {
        alert('Limite de intentos alcanzados')
        return;
    }
    // Inicia un temporizador con 179 segundos y muestra en el elemento con id 'timer'
    startTimer(179, $('#timer'));
// Inicializa los puntos y variables para los números del dominó
    puntos = 0;
    let primero = 0;
    let segundo = 0;
    let contenido = '';
 // Limpia los elementos HTML donde se mostrarán los dominós
    $('#lstdominos').html('');
    $('.contenedor').html('');
    $('.contenedor').html(firstItem);
    $('#btnIniciar').addClass('d-none');

// Mezcla aleatoriamente el array de números de dominó
    numerosDomino = shuffleArray(numerosDomino);

// Obtiene el primer dominó de la lista mezclada
    let firstDomino = numerosDomino[0];
     // Establece los atributos 'primero' y 'segundo' del primer dominó
    $('#firstDomino').attr('primero', firstDomino[0]);
    $('#firstDomino').attr('segundo', firstDomino[1]);

// Añade las clases CSS correspondientes a los números del primer dominó
    $('#firstDomino').find('.left1, .right1, .top ').addClass(`domino${firstDomino[0]}`);
    $('#firstDomino').find('.left2, .right2, .bottom ').addClass(`domino${firstDomino[1]}`);
// Reemplaza los elementos del dominó con los números correspondientes
    $('#firstDomino').find('.domino-number-item').eq(0).replaceWith(lstDominos[firstDomino[0]]);
    $('#firstDomino').find('.domino-number-item').eq(1).replaceWith(lstDominos[firstDomino[1]]);

 // Muestra el primer dominó
    $('#firstDomino').removeClass('d-none');

// Recorre los restantes números que hay en el domino
    for (let i = 1; i < numerosDomino.length; i++) {

 // Obtiene los números del dominó actual
        primero = numerosDomino[i][0];
        segundo = numerosDomino[i][1];

 // Construcción del contenido HTML para cada dominó
        contenido = `<div class="img-container" primero="${primero}" segundo="${segundo}">
                        <div class="d-flex justify-content-center">
                            <div class="container-item ms-2 domino">
                                <div class="domino-item">
                                    ${lstDominos[primero]}
                                    <div class="d-flex justify-content-center">
                                        <div class="separator"></div>
                                    </div>
                                    ${lstDominos[segundo]}
                                </div>
                            </div>
                        </div>
                    </div>`;

 // Añadir el contenido al contenedor de dominós
        $('#lstdominos').append(contenido);
    }
}
// Función para iniciar un temporizador
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);// texto  del timer

        if (--timer < 0) {
            finalizar_juego(display);
        }
    }, 1000);
}
// Función para finalizar el juego
function finalizar_juego(display){
    
    clearInterval(interval);
    display.text("00:00");
    $('#lstdominos').html('');
    $('.contenedor .selected-item').removeClass('selected-item')

    setTimeout(() => {
        display.text("03:00");
        juegos++,
        $('#score').html('0');
        guardarPuntuacion();
        $('#btnIniciar').removeClass('d-none');
    }, 2000);
}

// Función para guardar la puntuación del juego se asegura de que 
//la puntuación del juego se envíe al servidor para ser guardada y,
// dependiendo de la respuesta del servidor,
// decide si recargar la página para iniciar un nuevo juego o no.
function guardarPuntuacion() {
    return;
    $.post("app/game.php", //realiza una solicitud POST a la URL "app/game.php".
        {
            puntos, //Envía la variable 'puntos' como parte de los datos de la solicitud POST
        },
        function (data, status) { //  Función de callback que se ejecuta cuando la solicitud se completa
            if (!data.includes('00')) { // Verifica si la respuesta del servidor no incluye '00'
                location.reload;  // Recarga la página si la condición es verdadera
            }
        });
}