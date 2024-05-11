var config ={

type:Phaser.AUTO,
scale: {
    mode:Phaser.Scale.FIT,
    autoCenter:Phaser. Scale.CENTER_BOTH,
    widht:1400,
    height:650,
},
physics:{
    default:"arcade",
    arcade:{
        gravity:{y:0},
        debug:false
    }
},

 scene:[menu,nivel1]
}
var game=new Phaser.Game(config)
 