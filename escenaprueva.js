class nivel1 extends Phaser.Scene{
constructor() {
super( {key:"nivel1"});
 


this.piezas = []; // Arreglo para almacenar las 28 piezas de dominó
this.contenedorPiezas; // Contenedor para las piezas colocadas en el juego
this.piezasUnidas = []; // Arreglo para almacenar las piezas unidas
this.draggedTile = null; // Inicializar la variable para almacenar la ficha arrastrada
}

preload() {
this.load.image('fondo', './imagens/fondos/fondooriginal.png');

// Carga las imágenes de las 28 piezas de dominó
for (var i = 0; i <= 6; i++) {
for (var j = i; j <= 6; j++) {
this.load.image(`domino${i}${j}`, `./imagens/DOMNEGRO/DN${i},${j}.jpg`);
}
}
}

create() {
var fondo = this.add.image(400, 300, "fondo");
this.contenedorPiezas = this.add.container(400, 300);

const dominoTiles = {
"domino00": { left: 0, right: 0 },
"domino01": { left: 0, right: 1 },
"domino02": { left: 0, right: 2 },
"domino03": { left: 0, right: 3 },
"domino04": { left: 0, right: 4 },
"domino05": { left: 0, right: 5 },
"domino06": { left: 0, right: 6 },
"domino11": { left: 1, right: 1 },
"domino12": { left: 1, right: 2 },
"domino13": { left: 1, right: 3 },
"domino14": { left: 1, right: 4 },
"domino15": { left: 1, right: 5 },
"domino16": { left: 1, right: 6 },
"domino22": { left: 2, right: 2 },
"domino23": { left: 2, right: 3 },
"domino24": { left: 2, right: 4 },
"domino25": { left: 2, right: 5 },
"domino26": { left: 2, right: 6 },
"domino33": { left: 3, right: 3 },
"domino34": { left: 3, right: 4 },
"domino35": { left: 3, right: 5 },
"domino36": { left: 3, right: 6 },
"domino44": { left: 4, right: 4 },
"domino45": { left: 4, right: 5 },
"domino46": { left: 4, right: 6 },
"domino55": { left: 5, right: 5 },
"domino56": { left: 5, right: 6 },
"domino66": { left: 6, right: 6 }
// Agrega más fichas según sea necesario
};

var self = this;

let x = 0;
let y = 0;
let scale = 0.5; // Escala para las fichas de dominó

// Crear las fichas de dominó y asignar eventos
for (let i = 0; i <= 6; i++) {
for (let j = i; j <= 6; j++) {
const key = `domino${i}${j}`;
const tile = dominoTiles[key];

var dominotile =this.physics.add.sprite(x, y, key);
dominotile.setOrigin(0.5, 0.5);

// Aplicar escala uniforme
dominotile.setScale(scale);

// Mostrar valores al hacer clic
dominotile.setInteractive().on('pointerdown', function () {
console.log("Ficha seleccionada:", key, " - Izquierda:", tile.left, " - Derecha:", tile.right);

});






this.piezasUnidas = [];

// Habilitar arrastrar
this.input.setDraggable(dominotile);

// Cambiar color al arrastrar
dominotile.on('dragstart', function () {
this.setTint(0xff0000);
});

// Limpiar color al finalizar arrastre
dominotile.on('dragend', function () {
this.clearTint();
});

// Girar al arrastrar
dominotile.on('drag', function (pointer, dragX, dragY) {
this.x = dragX;
this.y = dragY;
});

this.contenedorPiezas.add(dominotile);

// Incrementar la posición para la siguiente ficha
x += 100 * scale; // Ajustar la posición según la escala
}
// Reiniciar posición en X y mover hacia abajo en Y para la siguiente fila
x = 0;
y += 200 * scale; // Ajustar la posición según la escala
}

// Habilitar colisiones entre las fichas de dominó
this.contenedorPiezas.list.forEach(function (piezaA) {
this.contenedorPiezas.list.forEach(function (piezaB) {
if (piezaA !== piezaB) {
self.physics.add.collider(piezaA, piezaB, function () {
const tileA = dominoTiles[piezaA.texture.key];
const tileB = dominoTiles[piezaB.texture.key];

if (tileA.left === tileB.right || tileA.right === tileB.left) {
// Las piezas encajan, unirlas

unirPiezas(piezaA, piezaB);

// Obtener todas las piezas conectadas
const piezasConectadas = [piezaA, piezaB];
// Buscar más piezas conectadas
this.contenedorPiezas.list.forEach(function (piezaC) {
if (!piezasConectadas.includes(piezaC)) {
const tileC = dominoTiles[piezaC.texture.key];
if (tileA.left === tileC.right || tileA.right === tileC.left ||
tileB.left === tileC.right || tileB.right === tileC.left) {
piezasConectadas.push(piezaC);
}
}
});

// Alinear y fijar la posición de la nueva pieza
this.contenedorPiezas.list.forEach(function (pieza) {
if (!piezasConectadas.includes(pieza)) {
alinearPiezaNueva(pieza, piezasConectadas);
}
});
}
});
}
});
}, this);







}


unirPiezas(piezaA, piezaB) {
// Unir las piezas;
piezaA.setPosition(piezaB.x, piezaB.y);
piezaA.setInteractive(false);

// Agregar la pieza unida al arreglo
this.piezasUnidas.push(piezaA);

// Deshabilitar interacción de la pieza unida
piezaA.setInteractive(false);

// Habilitar colisiones entre las piezas unidas
this.physics.add.collider(piezaA, piezaB);
};



alinearPiezaNueva(piezaNueva, piezasConectadas){
// Alinear y fijar la posición de la nueva pieza
const x = piezasConectadas[0].x;
const y = piezasConectadas[0].y;
piezaNueva.setPosition(x, y);

// Deshabilitar interacción de la nueva pieza
piezaNueva.setInteractive(false);

// Habilitar colisiones entre la nueva pieza y las piezas conectadas
piezasConectadas.forEach(function (pieza) {
this.physics.add.collider(piezaNueva, pieza);
}, this);


}






update() {

// Permitir arrastrar para todas las piezas
// Permitir arrastrar para todas las piezas
this.contenedorPiezas.list.forEach(pieza => {
    pieza.setInteractive();
    this.input.setDraggable(pieza, true);
});

}}