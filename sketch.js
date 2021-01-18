
var dolphin, dolphinImg;
var bg, bgImg;
var btang, ytang, cfish, afish;
var jelly, shark, anem;

var dt = 0;
var foodCount = 0;
var stingbite = 0;
var music;
var gamestate = 1;
var gameover;
var greatjob;
var obbeware;
var gameovers;
var gj;
var obbewares;
var home;


function preload(){
  dolphinImg=loadAnimation("dolphin1.png","dolphin1.png","dolphin2.png", "dolphin2.png");
  bgImg = loadAnimation("background.png");
  ytang = loadImage("ytang.png");
  btang = loadImage("btang.png");
  afish = loadImage("angelfish.png");
  cfish = loadImage("clownfish (1).png");
  shark = loadImage("shark (1).png");
  jelly = loadImage("jellyfish.png");
  anem = loadImage("anenome.png");
  music = loadSound("music.mp3");
  gameover = loadImage("gameover ocean-1.png");
  obbeware = loadImage("obbeware-1.png");
  greatjob = loadImage("greatjob-1.png");
  home = loadAnimation("ocean home.jpg");

  
}

function setup() {
 createCanvas(windowWidth, windowHeight);
  
  
  music.loop();
  
  
  bg = createSprite(200, 270, windowWidth, windowHeight);
  bg.addAnimation("norm", bgImg);
  //bg.addAnimation("home", home);
  
  bg.velocityX = -2;
  bg.x = bg.width;
  bg.scale = 3.25;
  
  dolphin = createSprite(75, 200, 10, 10);
  dolphin.addAnimation("dolphin", dolphinImg);
  dolphin.scale = 0.3;
  
  gameovers = createSprite(370, 300, 10, 10);
  gameovers.addImage(gameover);
  gameovers.visible = false;
  //dolphin.scale = 0.3;
  
  obbewares = createSprite(325, 400, 10, 10);
  obbewares.addImage(obbeware);
   obbewares.visible = false;
  //dolphin.scale = 0.3;
  
  gj = createSprite(375, 400, 10, 10);
  gj.addImage(greatjob);
   gj.visible = false;
  //dolphin.scale = 0.3;


  
  obGroup = new Group();
  foodGroup = new Group();
  
  dolphin.setCollider("rectangle",-25, -10, 400, 230)
}

function draw() {
 background(36, 196, 218);
  fill(0, 100, 100);
 text(mouseX+", "+mouseY, mouseX, mouseY)
 
 if(dt>=100||stingbite>=10){
   gamestate = 0;
 }
  
  textSize(25);
  
  if(dt>=100&&gamestate==0){
    text("Yay, you got the dolphin home!!!",200, 420);
    
  }
  textSize(20)
  if(stingbite>=10&&gamestate==0){
    text("You'll do better next time- Be careful of the anemones, jellyfish, and sharks.", 50, 420)
  }
  
  textSize(12)
  
 if(gamestate == 0){
  
   bg.visible = false;
   obGroup.destroyEach();
   foodGroup.destroyEach();
   dolphin.visible = false;
   dolphin.velocityY = 0;
  gameovers.visible = true;
    
   
  textend();
   
   
 }
  
  if(gamestate == 1){
    dolphin.y = mouseY;
 
  if(dolphin.isTouching(foodGroup)){
    foodGroup.destroyEach();
    foodCount = foodCount+1;
  } 
  
   if(dolphin.isTouching(obGroup)){
    obGroup.destroyEach();
    stingbite = stingbite+1;
  } 
  
  if(bg.x<200){
    bg.x = bg.width;
  }
obstacles();
  foods();
    
    dt = frameCount/50;
    text("Distance Traveled: "+Math.round(dt)+" km", 100, 40);
  text("Food Count: "+foodCount+" fish", 300, 40);
  text("Stings or Bites: "+stingbite, 450, 40);
  }
  
 
  
  
  
  
  drawSprites();
}

function obstacles(){
  if(frameCount % 100 == 0&&gamestate!==0){
    var ob = createSprite(600, 200, 10, 10);
    var rand = Math.round(random(1, 3));
   
    if(rand==1){
      ob.addImage(shark);
      ob.scale = 0.5;
      ob.setCollider("rectangle", 0, 0,100, 50)
    }else if(rand == 2){
      ob.addImage(jelly);
      ob.scale = 0.04;
    }else if(rand==3){
      ob.addImage(anem);
      ob.scale = 0.25;
    }
    
    ob.y = Math.round(random(100, 300));
    ob.velocityX  = -(3*dt/10);
    
    obGroup.add(ob);
    
    ob.lifeTime =200;
  }
}

function foods(){
  if(frameCount %50 == 0&&gamestate!==0){
  var food = createSprite(600, 200, 10, 10);
  var rand1 = Math.round(random(1, 4));
 
  if(rand1==1){
      food.addImage(ytang);
    food.scale = 0.5;
    food.setCollider("rectangle", 0, 0, 50, 50)
    }else if(rand1 == 2){
      food.addImage(btang);
      food.scale = 0.7;
      food.setCollider("rectangle", -200, -200,50, 50)
    }else if(rand1==3){
      food.addImage(cfish);
      food.scale = 0.1;
    }else if(rand1 == 4){
      food.addImage(afish);
      food.scale = 0.1;
    }
    
    
  food.y = Math.round(random(100, 300));
  food.velocityX = -(2*dt/10);
    food.lifeTime = 200;
    
    foodGroup.add(food);
  }
}
function touchMoved(){
  dolphin.y = touchMoved;
 
}



function textend(){
  textSize(20);
  text("Distance Traveled: "+Math.round(dt)+" km", 480, 40);
  text("Food Count: "+foodCount+" fish", 480, 70);
  text("Stings or Bites: "+stingbite, 480, 100);
  var score = Math.round(dt+foodCount-stingbite);
   text("Total Score: "+score, 480, 130)
}


