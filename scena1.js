class scena1 extends Phaser.Scene{

constructor(){
super("nivel1");

}

 piezas = []; // Arreglo para almacenar las 28 piezas de dominó
 contenedorPiezas; // Contenedor para las piezas colocadas en el juego

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

    var contenedor = this.add.container(400, 0);

    for (var i = 0; i <= 6; i++) {
        for (var j = i; j <= 6; j++) {
            var dominotile = this.physics.add.sprite(i * 100, j * 100, `domino${i}${j}`);
            
            dominotile.setOrigin(0.5, 0.5);
            contenedor.add(dominotile);
        }
    }

    const dominoTiles = {
        // Mapea los valores de las fichas del dominó
"domino00": { left: 0, right: 0 },
"domino01": { left: 0, right: 1 },
"domino02": { left: 0, right: 2 },

"domino03": { left: 0, right: 3 },
"domino04": { left: 0, right: 4 },
"domino05": { left: 0, right: 5},
"domino06": { left: 0, right: 6 },
"domino07": { left: 1, right: 1 },
"domino08": { left: 1, right: 2 },
"domino09": { left: 1, right: 3 },
"domino010": { left: 1, right:4 },
"domino011": { left: 1, right:5 },
"domino012": { left: 1, right:6 },
"domino013": { left: 2, right:2 },
"domino014": { left: 2, right:3 },
"domino15": { left: 2, right: 4},
"domino16": { left: 2, right: 5 },
"domino17": { left: 2, right: 6 },
"domino18": { left: 3, right: 3 },
"domino19": { left: 3, right: 4 },
"domino20": { left: 3, right: 5 },
"domino21": { left: 3, right: 6 },
"domino22": { left: 4, right: 4 },
"domino23": { left: 4, right: 5 },
"domino24": { left: 4, right: 6 },
"domino25": { left: 5, right: 5},
"domino26": { left: 5, right: 6 },
"domino27": { left: 6, right: 6 },


        


        // Agrega más fichas según sea necesario
    };
   


    var self = this;

    contenedor.iterate(function (child) {
        child.setInteractive();
        child.on('pointerdown', function () {
            
            var tileKey = child.texture.key;
           
            var tileValues = dominoTiles[tileKey];
           

            var leftSide = self.add.sprite(-30, 0, tileKey);
           
            leftSide.setOrigin(0.5, 0.5);
           
            leftSide.value = tileValues.left;
            
            child.add(leftSide);
            console.log(" funciono");
       

            var rightSide = self.add.sprite(30, 0, tileKey);
            rightSide.setOrigin(0.5, 0.5);
            rightSide.value = tileValues.right;
            child.add(rightSide);

           
            console.log("Valor del lado derecho de " + tileKey + ":", rightSide.value);
        });

        self.input.setDraggable(child);
        
        self.input.on('dragstart', function (pointer, gameObject,) {
            gameObject.setTint(0xff0000); // Cambiar color al empezar a arrastrar
        })

        self.input.on('dragend', function (pointer, gameObject,) { gameObject.clearTint(); // Limpiar el cambio de color
        
    })





        child.on('drag', function (pointer, dragX, dragY) {
            child.x = dragX;
            child.y = dragY;
            child.angle+=90;
            child.setCollideWorldBounds(true);
        });
    });
}
}