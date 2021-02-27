var balloon1, balloon1Img, balloon2, balloon2Img;
var balloon3, balloon3Img, balloon4, balloon4Img, balloon, balloonImg;
var database;

function preload(){
  balloon1Img = loadImage("images/balloon1.png");
  balloonImg = loadAnimation("images/balloon2.png", "images/balloon3.png", "images/balloon4.png");
  //balloonImg = loadImage("images/balloon2.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  console.log(database)

  balloon = createSprite(250, 250, 20, 20);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.5

  var balloonPositionRef = database.ref("balloon/position");
  balloonPositionRef.on("value", readPosition, showError);
}

function draw() {
  background(balloon1Img); 
  
  if(keyDown(LEFT_ARROW)){
    changePosition(-1,0)
    //balloon.x = balloon.x - 10;
  }

  else if(keyDown(RIGHT_ARROW)){
    changePosition(1,0)
    //balloon.x = balloon.x + 10;
  }

  else if(keyDown(UP_ARROW)){
    changePosition(0,-1)
    //balloon.y = balloon.y - 10;
  }

  else if(keyDown(DOWN_ARROW)){
    changePosition(0,1)
    //balloon.y = balloon.y + 10;
  }

  drawSprites();
}

function changePosition(x, y){
  database.ref("balloon/position").set({
    "x": position.x + x,
    "y": position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position)
  balloon.x = position.x
  balloon.y = position.y
}

function showError(){
  console.log("no data formed");
}