var PLAY = 1;
var END = 0;
var JOIN = 0;
var gameState = PLAY
var score = 0
var terzoMillennio, neonCity ,audir8;
var policeCarG,car,bulletG,gun;

function preload() {
  terzo = loadImage("devel.png");
  city = loadImage("hehe.jpg");
  BGmusic = loadSound("2.mp3");
  comingCar = loadImage("car1.png")
  AI = loadImage("car2.png")
  restartImg = loadImage("RESTART.jpg");
  gameOverImg = loadImage("gameOver.png");
  bullet = loadImage("bullet.png")
  b = loadImage("BOOST.png")
}

function setup() {
  createCanvas(1536, 752);
  BGmusic.loop();
  neonCity = createSprite(970, 400);
  neonCity.addImage(city);
  neonCity.velocityX = -10;
  neonCity.scale = 2.5



  invisibleGround = createSprite(200, 700, 400, 10);
  invisibleGround.visible = false;
  Ground = createSprite(200, 640, 400, 10);
  Ground.visible = false;
  
  audir8 = createSprite(200,450);
  audir8.addImage(AI);
  audir8.scale = 1;
  audir8.setCollider("rectangle",0,0,500,audir8.height);
  audir8.debug = false

  terzoMillennio = createSprite(230, 650);
  terzoMillennio.addImage(terzo);
  terzoMillennio.scale = 0.7;
  //camera.position.x = terzoMillennio.x
  //camera.position.y = terzoMillennio.y

  restart = createSprite(800,400);
  restart.addImage(restartImg);
  
  boost = createSprite(10,660);
  boost.addImage(b);
  boost.scale = 0.2;
  boost.visible = 0;

  gameOver = createSprite(800,300);
  gameOver.addImage(gameOverImg);
  carG = new Group();
  bulletG = new Group();
}

function draw() {
  background(180);
  drawSprites();
  strokeWeight(4)
  fill("black")
  textSize(35)
  text("Score: " + score, 700, 100);
  text("🏎 PRESS RIGHT ARROW FOR NITRO 🏎",480,50)


  if (neonCity.x < 400) {
    neonCity.x = neonCity.x = 700;

  }

  terzoMillennio.velocityY = terzoMillennio.velocityY + 0.9
  boost.y = terzoMillennio.y
  audir8.velocityY = audir8.velocityY + 0.9

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    if (keyDown("space") && terzoMillennio.y > 250) {
      terzoMillennio.velocityY = -10;
    }
    if (keyDown("right")) {
      neonCity.x = neonCity.x + -15; 
      boost.visible = 1;
    }else{
      boost.visible = 0;

    }


    restart.visible = false;
    gameOver.visible = false;
    terzoMillennio.collide(invisibleGround);
    audir8.collide(Ground);

    if (terzoMillennio.isTouching(carG)){
      gameState = END;
    }    
    if (terzoMillennio.isTouching(bulletG)){
      gameState = END;
    }       
    if (audir8.isTouching(carG)){
       audir8.velocityY = -12;
    }
    
    spawncar();
    spawnbullet();
  }else if(gameState === END){
    restart.visible = true;
    gameOver.visible = true;
    //set velcity of each game object to 0
    neonCity.velocityX = 0;
    //gun.velocityX = 0;

    terzoMillennio.velocityY = 0;
    audir8.velocityY = 0;
    carG.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    carG.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }

function spawncar(){
  //write code here to spawn the clouds
  if (frameCount % 500 === 0) {
     car = createSprite(1700,600,20,20);

    //car.x= Math.round(random(600,100));

    car.addImage(comingCar);
    car.scale = 0.4;
    car.velocityX = -10 ;
    
     //assign lifetime to the variable
    car.lifetime = 300;
    
    //adding cloud to the group
   carG.add(car);
}
}

}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  neonCity.velocityX = -6;
  carG.destroyEach();
  
 
  
  score = 0;
  
}
function spawnbullet(){
  //write code here to spawn the clouds
  if (frameCount % 250 === 0) {
     gun = createSprite(600,160,20,20);

    //car.x= Math.round(random(600,100));

    gun.addImage(bullet);
    gun.scale = 0.1;
    gun.velocityX = -8;
    
     //assign lifetime to the variable
    gun.lifetime = 150;
    
    //adding cloud to the group
   bulletG.add(gun);
}
}