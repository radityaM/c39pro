var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

var enemy1img,enemy1fall;
var enemy2img,enemy2fall;

var enemyGroup1;
var enemyGroup2;
var enemyGroup3;

var gameOver,gameOverImg;

var obstacle,obstacleImg1,obstacleImg2,obstacleImg3;

var bellSound;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  enemy1img=loadAnimation("opponent1.png","opponent2.png");
  enemy1fall=loadImage("opponent3.png");
  enemy2img=loadAnimation("opponent7.png","opponent8.png");
  enemy2fall=loadImage("opponent9.png");
  enemy3img=loadAnimation("opponent4.png","opponent5.png");
  enemy3fall=loadImage("opponent6.png");
  gameOverImg=loadImage("gameOver.png");
  obstacleImg1=loadImage("obstacle1.png");
  obstacleImg2=loadImage("obstacle2.png");
  obstacleImg3=loadImage("obstacle3.png");
  bellSound=loadSound("sound/bell.mp3");
}

function setup(){
  createCanvas(800,300);

  // Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCyclist  = createSprite(70,150,20,20);
  mainCyclist.addAnimation("Rocky",mainRacerImg1);
  mainCyclist.scale=0.05;

  gameOver = createSprite(400,130);
  gameOver.addImage(gameOverImg);

  enemyGroup1=new Group();
  enemyGroup2=new Group();
  enemyGroup3=new Group();
  
  obstacleGroup=new Group();
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(path.x < 0 ){
    path.x = (width/2)+55;
  }
  
  if(gameState===PLAY){
  
   mainCyclist.y = mainCyclist.y+((World.mouseY-Math.round(mainCyclist.y))/5)
   opponent1();
   opponent2();
   opponent3();
   obstacles();
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
   distance=frameCount;
   path.velocityX=-(5+3*distance/250)
   
   mainCyclist.x=camera.position.x;
   //path.x=camera.position.x;
   
   gameOver.visible=false;
  //code to reset the background
  if(keyDown("space")){
    bellSound.play();
  }  

    
  if(enemyGroup1.isTouching(mainCyclist)){
    enemyGroup2.destroyEach();
    enemyGroup3.destroyEach();
    obstacleGroup.destroyEach();
    gameState = END;

    enemy1.addAnimation("enemy1",enemy1fall);
    mainCyclist.addAnimation("Rocky",mainRacerImg2);
  }
    
  if(enemyGroup2.isTouching(mainCyclist)){
    enemyGroup1.destroyEach();
    enemyGroup3.destroyEach();
    obstacleGroup.destroyEach();
    gameState = END;

    enemy2.addAnimation("enemy2",enemy2fall);
    mainCyclist.addAnimation("Rocky",mainRacerImg2);
  }
    
if(enemyGroup3.isTouching(mainCyclist)){
    enemyGroup2.destroyEach();
    enemyGroup1.destroyEach();
    obstacleGroup.destroyEach();
    gameState = END;
    
    enemy3.addAnimation("enemy3",enemy3fall);
    mainCyclist.addAnimation("Rocky",mainRacerImg2);
  }
  
        
if(obstacleGroup.isTouching(mainCyclist)){
    enemyGroup2.destroyEach();
    enemyGroup1.destroyEach();
    enemyGroup3.destroyEach();
    gameState=END;
  
  mainCyclist.addAnimation("Rocky",mainRacerImg2);
  }




    
 }else if(gameState===END){
   enemyGroup1.setVelocityEach(0,0);
   enemyGroup1.setLifetimeEach(-1);
   enemyGroup2.setVelocityEach(0,0);
   enemyGroup2.setLifetimeEach(-1);
   enemyGroup3.setVelocityEach(0,0);
   enemyGroup3.setLifetimeEach(-1);
   obstacleGroup.setVelocityEach(0,0);
   obstacleGroup.setLifetimeEach(-1);
   gameOver.visible=true;
   path.velocityX=0;
   text("Press Up Arrow to Restart",300,190);
   
   if(keyDown("UP_ARROW")){
      mainCyclist.addAnimation("Rocky",mainRacerImg1);
      gameState=PLAY;
      enemyGroup1.destroyEach();
      enemyGroup2.destroyEach();
      enemyGroup3.destroyEach();
      obstacleGroup.destroyEach();
      frameCount=0;
     path.velocityX=-5;
   }
   
 }
}


function opponent1(){
  if(frameCount%150===0){
  enemy1=createSprite(760,Math.round(random(30,270)));
  enemy1.velocityX=-(6+3*distance/250);
  enemy1.addAnimation("enemy1",enemy1img);
  enemy1.scale=0.05;
  enemy1.lifetime=170
  enemyGroup1.add(enemy1);
  }
  
}


function opponent2(){
  if(frameCount%170===0){
  enemy2=createSprite(760,Math.round(random(30,270)));
  enemy2.velocityX=-(7+3*distance/250);
  enemy2.addAnimation("enemy2",enemy2img);
  enemy2.scale=0.05;
  enemy2.lifetime=170
  enemyGroup2.add(enemy2);
  }
  
}


function opponent3(){
  if(frameCount%190===0){
  enemy3=createSprite(760,Math.round(random(30,270)));
  enemy3.velocityX=-(8+3*distance/250);
  enemy3.addAnimation("enemy3",enemy3img);
  enemy3.scale=0.05;
  enemy3.lifetime=170
  enemyGroup3.add(enemy3);
  }
  
}

function obstacles(){
  if(frameCount%280===0){
    obstacle=createSprite(760,Math.round(random(30,270)));
    var rand = Math.round(random(1,3));
    obstacle.velocityX=-(5+3*distance/250);
    switch(rand){
      case 1: obstacle.addImage("obstacleImg",obstacleImg1);
        break;
      case 2: obstacle.addImage("obstacleImg",obstacleImg2);
        break;
      case 3: obstacle.addImage("obstacleImg",obstacleImg3);
        break;
      default: break;
    }

    obstacle.scale=0.05;
    obstacle.lifetime=170
    obstacleGroup.add(obstacle);
  }
  
}