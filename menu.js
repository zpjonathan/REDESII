
// Define la escena del menú
class menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }

    preload() {
        // Carga aquí los recursos necesarios para el menú, como imágenes y fuentes
        this.load.image('menu', './imagens/fondos/fondomenu1.png');
        this.load.image('botonplay', './imagens/fondos/botonplay1.jpg');
        this.load.image('botonexit', './imagens/fondos/botonexit.jpg');
        
    }

    create() {
        var menu = this.add.image(400, 300, "menu");
        // Agrega elementos visuales al menú
        this.add.text(200, 600, '¡BIENVENIDOS!', {
            fontFamily: 'Verdana',
            fontSize: '50px',
            color: '#ff0000'
        });
        
        const botonexit= this.add.image(800, 200, 'botonexit').setInteractive();
        botonexit.on('pointerdown', () => {
           
    })
        const botonplay= this.add.image(800, 100, 'botonplay').setInteractive();
        botonplay.on('pointerdown', () => {
           
            this.scene.start('nivel1'); // Transición a la escena del jueg
            
     });

       /* this.startGame();*/
       

    }
     
    startGame() {
        this.scene.start(''); // Transición a la escena del jueg
        }
}

