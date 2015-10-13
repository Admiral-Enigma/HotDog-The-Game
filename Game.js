var game = new Phaser.Game(700, 600, Phaser.AUTO, 'MakeAHotDog', { preload: preload, create: create, update: update });
var hotdogsMade = 0;
var maxHotDogs = 10;
var hotDog;
var moneys = 0;
var moneyText;
var score;
var sellButton;
var bg;
var hotDogButton;
var hotdogs;

function preload(){
    game.load.image('hotdog', 'hotDog.png');
    game.load.image("bg", "bg.png");
    game.load.image("sellButton", "sellAll.png");
    game.load.image("hotdogBut", "hotdogButton.png");
}

function create(){
    hotdogs = game.add.group();
    
    game.input.mouse.capture = true;
    score = game.add.text(30, 30, "You have made "+hotdogsMade+ " HotDogs", { font: "20px Arial",  fill: '#ffffff' });
    bg = game.add.sprite(0, 0, 'bg');
    moneyText = game.add.text(30, 60, ""+moneys+"$", { font: "20px Arial",  fill: '#ffffff' });
    
    sellButton = game.add.sprite(20, 700 - 150, "sellButton");
    sellButton.events.onInputDown.add(sellHotDogs, this);
    sellButton.inputEnabled = true;
    
    hotDogButton = game.add.sprite(150, 700 - 150, "hotdogBut");
    hotDogButton.events.onInputDown.add(addHotDog, this);
    hotDogButton.inputEnabled = true;
    
}

function addHotDog(){
    if(hotdogsMade < maxHotDogs){
        hotDog = game.add.sprite(Math.floor((Math.random() * 800) + 1), Math.floor((Math.random() * 600) + 1), 'hotdog');
        hotDog.scale.set(0.5);
        hotdogsMade++;
    }
}

function sellHotDogs(){
    moneys += hotdogsMade;
    hotdogsMade -= hotdogsMade;
    console.log("FISK");
}

function updateText(){
    score.text = "You have made "+hotdogsMade+"/"+maxHotDogs+ " HotDogs";
    score.bringToTop();
    moneyText.text = ""+moneys+"$";
    moneyText.bringToTop();
    hotDogButton.bringToTop();
    sellButton.bringToTop();
}

function update(){
    updateText();
}