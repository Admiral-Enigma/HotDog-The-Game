var game = new Phaser.Game(800, 600, Phaser.AUTO, 'MakeAHotDog', { preload: preload, create: create, update: update });
var hotdogsMade = 0;
var score;
var bg;

function preload(){
    game.load.image('hotdog', 'hotDog.png');
    game.load.image("bg", "bg.png");
}

function create(){
   game.input.mouse.capture = true;
   score = game.add.text(30, 30, "You have made "+hotdogsMade+ " HotDogs", { font: "20px Arial",  fill: '#ffffff' });
   bg = game.add.sprite(0, 0, 'bg');
}

function addHotDog(){
    game.add.sprite(Math.floor((Math.random() * 800) + 1), Math.floor((Math.random() * 600) + 1), 'hotdog');
    hotdogsMade++;
}
function updateScore(){
    score.text = "You have made "+hotdogsMade+ " HotDogs";
    score.bringToTop();
}

function update(){
    updateScore();
    if(game.input.activePointer.leftButton.isDown){
        addHotDog();
    }
}