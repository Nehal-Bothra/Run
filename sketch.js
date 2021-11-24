var tree
var treesGroup, treeImage;
var runner, runner_running, runner_collided
var rockgroup, rock1, rock2, rock3, rock4, rock5, rock6
var score=0
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground, invisibleGround, groundImage;
var gameOverImg,restartImg

function preload(){
    treeImage = loadImage("Tree.png");
    groundImage = loadImage("ground.png");
    runner_running = loadAnimation("runner1.png","runner2.png");
    runner_collided = loadAnimation("runner3.png")

    rock1 = loadImage("rock1.png");
    rock2 = loadImage("rock2.png");
    rock3 = loadImage("rock3.png");
    rock4 = loadImage("rock4.png");
    rock5 = loadImage("rock5.png");
    rock6 = loadImage("rock6.png");

    restartImg = loadImage("restart.png")
    gameOverImg = loadImage("gameOver.png")
}

function setup() {
 createCanvas(600,200)
 
  runner = createSprite(50,160,20,50);
  runner.addAnimation("running", runner_running);
  
  runner.scale = 0.2;
  
 ground = createSprite(200,150,700,200);
 ground.addImage("ground",groundImage);
 ground.x = ground.width /2;
 
 gameOver = createSprite(300,50);
 gameOver.addImage(gameOverImg);
 
 restart = createSprite(300,140);
 restart.addImage(restartImg);
 

 gameOver.scale = 0.2;
 restart.scale = 0.2;
 
 invisibleGround = createSprite(200,190,400,10);
 invisibleGround.visible = false;

 rocksGroup = createGroup();
 treesGroup = createGroup();
 
 score = 0;
}

function draw() { 
 background("lightblue")
 text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)

    score = score + Math.round(getFrameRate()/60);
    

    
    if (ground.x < 0){
      ground.x = ground.width/3;
    }
  
    if(keyDown("space")&& runner.y >= 100) {
        runner.velocityY = -14;
        
    }
    
    runner.velocityY = runner.velocityY + 0.8
  
    spawnTrees();
  
    spawnRocks();
    
    if(rocksGroup.isTouching(runner)){

       gameState = END;
         
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
 
      runner.changeAnimation("running", runner_collided);
    
     
      ground.velocityX = 0;
      runner.velocityY = 0
    
     rocksGroup.destroyEach();
     treesGroup.destroyEach();
     
     rocksGroup.setVelocityXEach(0);
     treesGroup.setVelocityXEach(0);    
   }
  
 
 
  runner.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}

function reset(){
  gameState=PLAY;
  gameOver.visible = false;
  restart.visible = false;
  runner.changeAnimation("running",runner_running)
  score=0
}


function spawnRocks(){
 if (frameCount % 60 === 0){
   var rock = createSprite(600,175,10,40);
   rock.velocityX = -(6 + score/100);
   

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: rock.addImage(rock1);
              break;
      case 2: rock.addImage(rock2);
              break;
      case 3: rock.addImage(rock3);
              break;
      case 4: rock.addImage(rock4);
              break;
      case 5: rock.addImage(rock5);
              break;
      case 6: rock.addImage(rock6);
              break;
      default: break;
    }
        
    rock.scale = 0.1;
    rock.lifetime = 300;

    rocksGroup.add(rock);
 }
}

function spawnTrees() {

  if (frameCount % 60 === 0) {
    var tree = createSprite(600,120,40,10);
    tree.y = Math.round(random(80,120));
    tree.addImage(treeImage);
    tree.scale = 0.4;
    tree.velocityX = -3;

    runner.lifetime = -1;

    tree.depth = runner.depth;
    runner.depth = runner.depth + 1;
    
    ground.depth = tree.depth;
    tree.depth = tree.depth + 1;

    ground.depth = runner.depth;
    runner.depth = runner.depth + 1; 

    treesGroup.add(tree);
  }
}

