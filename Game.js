var game = new Phaser.Game(700, 600, Phaser.AUTO, 'MakeAHotDog', { preload: preload, create: create, update: update });

//Obj vars
var hotDog;
var sellButton;
var bg;
var hotDogButton;
var shopButtton;
var shopFrame;

//Booleans
var shopOpen = false;

//Group vars
var hotdogs;

// Text vars
var moneyText;
var score;
var totalHotDogsMadeText;
var totalMoneyMadeText;

//Int vars
var hotdogsMade = 0;
var totalHotDogsMade = 0;
var maxHotDogs = 10;
var moneys = 0;
var totalMoneyMade = 0;

//HotDog storage vars
var hotDogStorageBuyButton;
var hotDogStorageText;
var hotDogStoragePrice = 10;
var hotDogStoragePriceText;
var hotDogStorageAmount = 0; 
var hotDogStorageAmountText;

//Base shop item
//var item = {
//    itemName : "AutoClicker",
//    price : 100,
//    image       : "AutoclickerImg",
//    priceIncrease  : "200",
//    amount    : "0"
//};

function preload(){
    game.load.image('hotdog', 'hotDog.png');
    game.load.image("bg", "bg.png");
    game.load.image("sellButton", "sellAll.png");
    game.load.image("hotdogBut", "hotdogButton.png");
    game.load.image("shopBut", "shopButton.png");
    game.load.image("shopFrame", "shopFrame.png");
    game.load.image("testassets1", "star.png");
    game.stage.disableVisibilityChange = true;
}

function create(){
    hotdogs = game.add.group();
    
    game.input.mouse.capture = true;
    
    //The Score
    score = game.add.text(30, 30, "You have made "+hotdogsMade+ " HotDogs", { font: "20px Arial",  fill: '#ffffff' });
    
    //The Background
    bg = game.add.sprite(0, 0, 'bg');
    
    //How many Moneyz you have
    moneyText = game.add.text(30, 60, ""+moneys+"$", { font: "20px Arial",  fill: '#ffffff' });
    
    //The Button thats sell your hotdogs
    sellButton = game.add.sprite(20, 700 - 150, "sellButton");
    sellButton.events.onInputDown.add(sellHotDogs, this);
    sellButton.inputEnabled = true;
    
    //The magic button that makes hotdogs
    hotDogButton = game.add.sprite(150, 700 - 150, "hotdogBut");
    hotDogButton.events.onInputDown.add(addHotDog, this);
    hotDogButton.inputEnabled = true;
    
    //The Shop button
    shopButtton = game.add.sprite(700 - 110 - 20, 700 - 150, "shopBut");
    shopButtton.events.onInputDown.add(openShop, this);
    shopButtton.inputEnabled = true;
    
    //How many Hotdogs you have made in total
    totalHotDogsMadeText = game.add.text(30, 90, "Total hotdogs made"+totalHotDogsMade, { font: "15px Arial",  fill: '#ffffff' });
    
    //How many Money you have made in total
    totalMoneyMadeText = game.add.text(30, 110, "Total Money earned "+totalMoneyMade,{ font: "15px Arial",  fill: '#ffffff' });
    
}

function addHotDog(){
    if(hotdogsMade < maxHotDogs){
        hotDog = game.add.sprite(Math.floor((Math.random() * 800) + 1), Math.floor((Math.random() * 600) + 1), 'hotdog');
        hotDog.scale.set(0.5);
        hotdogsMade++;
        totalHotDogsMade += 1;
        
        //Update the shop on click
        updateShop();
    }
}

function openShop(){
    if(!shopOpen){
        shopOpen = true;
        drawShop();
    }else if(shopOpen){
        closeShop();
    }
}

function drawShop(){
    //The frame
    shopFrame = game.add.sprite(700 - 200 - 20, 600 - 300 - 40 - 30, "shopFrame");
    
    //Test shopItem
    hotDogStorageBuyButton = game.add.sprite(700 - 200 + 65, 250 + 22 + 20, "testassets1");
    //The text
    hotDogStorageText = game.add.text(495, 250, "Upgrade hotdog storage", { font: "15px Arial",  fill: '#ffffff' });
    // the buttons input
    hotDogStorageBuyButton.events.onInputDown.add(buyHotdogStorage, this);
    hotDogStorageBuyButton.inputEnabled = true;
    
    //Price Text
    hotDogStoragePriceText = game.add.text(495, 300, "Price: "+hotDogStoragePrice, { font: "15px Arial",  fill: '#ffffff' });
    
    //How many upgrades you have
    hotDogStorageAmountText = game.add.text(495, 270, "You have: "+hotDogStorageAmount, { font: "15px Arial",  fill: '#ffffff' });

}

function updateShop(){
    shopFrame.bringToTop();
    hotDogStorageText.bringToTop();
    hotDogStorageAmountText.bringToTop();
    hotDogStorageBuyButton.bringToTop();
    hotDogStoragePriceText.bringToTop();
}

//TODO: Add en utills til at gøre det

function buyHotdogStorage(){
    if(moneys >= hotDogStoragePrice){
        hotDogStorageAmount++;
        moneys -= hotDogStoragePrice;
        maxHotDogs += 5;
        hotDogStoragePrice += 20;
    }
    
    //Update the amount text
    hotDogStorageAmountText.text = "You have: "+hotDogStorageAmount;
    hotDogStoragePriceText.text = "Price: "+hotDogStoragePrice;

}

function closeShop(){
    shopOpen = false;
    shopFrame.kill();
    
    hotDogStorageText.kill();
    hotDogStorageBuyButton.kill();
    hotDogStorageAmountText.kill();
    hotDogStoragePriceText.kill();
}

function sellHotDogs(){
    moneys += hotdogsMade;
    totalMoneyMade += hotdogsMade;
    hotdogsMade -= hotdogsMade;
    //console.log("FISK");
}

function updateText(){
    score.text = "You have made "+hotdogsMade+"/"+maxHotDogs+ " HotDogs";
    score.bringToTop();
    moneyText.text = ""+moneys+"$";
    moneyText.bringToTop();
    totalHotDogsMadeText.bringToTop();
    totalHotDogsMadeText.text = "Total hotdogs made: "+totalHotDogsMade;
    totalMoneyMadeText.bringToTop();
    totalMoneyMadeText.text = "Total Money earned "+totalMoneyMade;
    shopButtton.bringToTop();
    hotDogButton.bringToTop();
    sellButton.bringToTop();
}

function update(){
    updateText();
}