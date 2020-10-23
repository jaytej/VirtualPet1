//Create variables here
var dog, database, foodstock, foods;

function preload()
{
	//load images here
  dog1 = loadImage("images/dogImg.png");
  dog2 = loadImage("images/dogImg1.png");
  bg = loadImage("images/0.png");
}

function setup() {
	createCanvas(600, 500);
  
  database = firebase.database();
  console.log(database);
   dog = createSprite(410,350,50,50);
   dog.addImage("dog",dog1);
   dog.scale = 0.2; 

  foodstock = database.ref('Food');
  foodstock.on("value",readStock);
}


function draw() {  
  background(bg);

if (keyWentDown("up")) {

  writeStock(foods);
  dog.addImage("happy",dog2)
  dog.changeImage("happy");
}
if (keyWentUp("up")) {

  dog.changeImage("dog");
}

  drawSprites();

  textSize(20);
  fill("black");
  text("Press Up Arrow key to feed Drago food",100,20);

  if (foods!=undefined) {
    
    fill("white")
    text("Food Remaining : "+foods,210,250)
  }
}
function writeStock(x) {
  
  if (x<=0) {
    
    x=0;
  }else{

    x=x-1;
  }

   database.ref('/').update({
     Food: x
   })
}

function readStock(data){

  foods = data.val();
}