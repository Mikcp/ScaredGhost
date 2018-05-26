var ghost, sun1, sun2;
var bullets;

function setup() {
  createCanvas(1600,700);

  ghost = createSprite(800, 350, 50, 100);
  ghost.addAnimation("floating", "assets/ghost1.png", "assets/ghost4.png");
  ghost.addAnimation("surprised", "assets/ghostsurprise1.png", "assets/ghostsurprise4.png");
  ghost.addAnimation("skull", "assets/skull.png");

  sun1 = createSprite(150, 50, 50,100);
  sun1.addAnimation("burn", "assets/sol1.png", "assets/sol4.png");
  sun1.velocity.y = 3;
  sun1.setCollider("circle", 0,0,25);

  sun2 = createSprite(1450, 650, 50,100);
  sun2.addAnimation("burn", "assets/sol1.png", "assets/sol4.png");
  sun2.velocity.y = -3;
  sun2.setCollider("circle", 0,0,25);

  bullets = new Group();
}

function getAngle(sx, sy, gx, gy){
  if (sx-gx == 0) {
    console.log("mateix x");
      if (gy > sy) return 0;
      else return 180;
  }
  if(sy-gy == 0) {
    console.log("mateix y");
      if(sx > gx) return 270;
      else return 90;
  }
  var a = Math.atan((sy-gy)/float(sx-gx));
  a = a*180/Math.PI;
  console.log(a);
  return a;
}

function draw() {
  background(0,0,0);
  fill(255,255,0);
  rect(1300,0,300,700);
  rect(0,0,300,700);

  //ghost movement X
  if(mouseX < ghost.position.x - 10) {
    ghost.mirrorX(1);
    ghost.velocity.x = - 2;
  }
  else if(mouseX > ghost.position.x + 10) {
    ghost.mirrorX(-1);
    ghost.velocity.x = 2;
  }
  else ghost.velocity.x = 0;

  //ghost movement Y
  if(mouseY < ghost.position.y - 10) ghost.velocity.y = - 2;
  else if(mouseY > ghost.position.y + 10) ghost.velocity.y = 2;
  else ghost.velocity.y = 0;



  //suns behavior
  if(sun1.position.y === 50 || sun2.position.y === 50){
    sun1.velocity.y *= (-1);
    sun2.velocity.y *= (-1);
  }

  ghost.collide(sun1);
  ghost.collide(sun2);

  //bullets
  var ran = Math.floor(Math.random(-1,3) * 500);
if(ran < 3) {
  console.log("dispara sol1");
  var bullet = createSprite(sun1.position.x, sun1.position.y,10,10);
  bullet.addAnimation("normal", "assets/missil1.png", "assets/missil4.png");
  var angl = getAngle(sun1.position.x, sun1.position.y, ghost.position.x, ghost.position.y);
  bullet.setSpeed(4, angl);
  bullet.rotation = -angl;
  //bullet.life = 30;
  bullet.mirrorX(-1);
  bullets.add(bullet);
}
else if (ran > 497){
  console.log("dispara sol2");
  var bullet = createSprite(sun2.position.x, sun2.position.y,10,10);
  bullet.addAnimation("normal", "assets/missil1.png", "assets/missil4.png");
  var angl = getAngle(sun2.position.x, sun2.position.y, ghost.position.x, ghost.position.y);
  bullet.setSpeed(-4, angl);
  bullet.rotation = angl;
  //bullet.life = 1000;
  bullets.add(bullet);
}

  if(bullets.overlap(ghost)){
    ghost.changeAnimation("skull");
  }
  else if(ghost.position.x > 1300 || ghost.position.x <= 300){
    ghost.changeAnimation("surprised");
  }
  else ghost.changeAnimation("floating");
  drawSprites();
}
