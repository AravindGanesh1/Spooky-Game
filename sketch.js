var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost=createSprite(200,300)
  ghost.addImage("ghost",ghostImg)
  ghost.scale=0.5

  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup= new Group();
}

function draw() {
  background(200);

  if(gameState==="play"){

  spookySound.play();
  
  if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown(LEFT_ARROW)){
      ghost.x=ghost.x-3
    }

    if(keyDown(RIGHT_ARROW)){
      ghost.x=ghost.x+3
    }

    if(keyDown("space")){
    
      ghost.velocityY=-12
    }
    ghost.velocityY=ghost.velocityY+0.3
    SpawnDoors();

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if(ghost.y>600||invisibleBlockGroup.isTouching(ghost)){
      ghost.destroy();
      gameState="end"
    }
    drawSprites();
  }
  

    
    if(gameState==="end"){
      fill("white")
      textSize(35)
      text("GAME OVER",300,300)
      spookySound.stop();
    }
    
}
function SpawnDoors(){
  if(frameCount%200===0){
  var door=createSprite(100,100)
  door.addImage(doorImg)
  door.velocityY=1
  var climber=createSprite(100,170)
  climber.addImage(climberImg)
  climber.velocityY=1
  door.x=Math.round(random(120,400))
  climber.x=door.x
  door.lifetime=700
  climber.lifetime=700
  climbersGroup.add(climber)  
  doorsGroup.add(door)
  ghost.depth=door.depth
  ghost.depth+=1
  var invisibleBlock=createSprite(100,175)
  invisibleBlock.width=climber.width
  invisibleBlock.height=2
  invisibleBlock.velocityY=1
  invisibleBlock.x=climber.x
  invisibleBlock.debug=true
  invisibleBlock.lifetime=700
  invisibleBlockGroup.add(invisibleBlock)
 }


}
