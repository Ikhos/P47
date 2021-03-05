var bg;
var oasis, desert, plains, swamp;
var knight, knightImg, dragon, dragonImg;
var ground;
var appleImage;
var apple, sprite, applesGroup, appleCollect; 
var score = 0;
var floorType;

function preload(){
    loadBgImages();
    loadPlatformImages();
    knightImg = loadImage("Knight.png");
    dragonImg = loadImage("dragon.png");
    appleImage = loadImage("fruit.png");
    appleCollect = loadSound("sound_effect.mp4");
    
}

function setup() {
    createCanvas(1400, 800);

    //knight
    knight = createSprite(200, 650);
    knight.addImage(knightImg);
    knight.setCollider("rectangle", 0,0, 200,200);
    knight.debug = true;
    knight.scale = 0.6;

    //dragon
    dragon = createSprite(150, 200);
    dragon.addImage(dragonImg);
    dragon.scale = 0.6;

    //ground
    ground = createSprite(700, 780, 1400, 20);


    //Group
   // applesGroup = new Group();

    applesGroup = createGroup();
    floorGroup = createGroup();
    
    
}

function draw() {
    chooseBackground();
    background(bg);
    knight.collide(ground);
    ground.visibile = false;

    if(keyDown(UP_ARROW) && knight.y >= 600){
        knight.velocityY = -20;
    }
    if(keyDown(DOWN_ARROW)){
        knight.velocityY = 10;
    }
    knight.velocityY += 1;
    
    apples();
    textSize(20);
    textStyle(BOLD);
    fill("green");
    text("Score : " + score, 600, 400);
    if(applesGroup.isTouching(knight)){
        
        //applesGroup.remove(sprite);
        //applesGroup.destroyEach();
        applesGroup.get(0).destroy();
        score += 100;
        appleCollect.play();
        
        //console.log("TOUCHING.." + applesGroup.size());
    }
    if(floorGroup.isTouching(knight)){
        knight.destroy();
        var screenBlack = createSprite(700, 400, 1400, 800);
        screenBlack.shapeColor = "black";
        
    }
    floors();
    drawSprites();
}

function chooseBackground() {
    if(frameCount <= 1000) {
        bg = plains;
        floorType = plainsFloor;
    }
    if(frameCount <= 2000 && frameCount > 1000) {
        bg = desert;
        floorType = desertFloor;
    }
    if(frameCount <= 2500 && frameCount > 2000) {
        bg = oasis;
        floorType = desertFloor;
    }
    if(frameCount <= 3000 && frameCount > 2500) {
        bg = desert;
        floorType = desertFloor;
    }
    if(frameCount <= 4000 && frameCount > 3000) {
        bg = swamp;
        floorType = swampFloor;
    }
}

function loadBgImages() {
    oasis = loadImage("oasis.jpg");
    print(oasis);
    desert = loadImage("desert.jpg");
    print(desert);
    plains = loadImage("plains.jpg");
    print(plains);
    swamp = loadImage("swamp.jpg");
    print(swamp);
}
function loadPlatformImages() {
    desertFloor = loadImage("desertFloor.png");
    print(desert);
    plainsFloor = loadImage("plainFloor.png");
    print(plains);
    swampFloor = loadImage("swampFloor.png");
    print(swamp);
}

function apples() {
    if(frameCount % 100 === 0) {
        //apple = new Apple();
        sprite = createSprite(1500, random(400, 700));
        sprite.addImage(appleImage);
        sprite.velocityX = -4;
        sprite.lifetime = 1500;
        sprite.scale = 0.1;
        applesGroup.add(sprite);
        //console.log("added.." + applesGroup.size());

    }

}

function floors() {
    
    if(frameCount % 150 === 0) {
        //apple = new Apple();
        sprite = createSprite(1500, random(400, 700));
        sprite.addImage(floorType);
        sprite.debug = true;
        sprite.setCollider("rectangle", 0, 10, 200, 10);
        sprite.velocityX = -4;
        sprite.lifetime = 1500;
        sprite.scale = 0.2;
        floorGroup.add(sprite);
        //console.log("added.." + applesGroup.size());

    }

}
