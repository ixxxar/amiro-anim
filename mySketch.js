let pg;
let TILES_X = 100;
let TILES_Y = 100; 
let TILE_W, TILE_H;
let myModel;
let asciiChars = "&#0*%1+";
let font;
let angle = 0; 
let targetAngleY = 0;
let currentAngleX = 0;
let currentAngleY = 0;
let currentAngleZ = 0;

function preload() {
  myModel = loadModel('butterfly (1).obj', true);
  font = loadFont('Geist-Light.ttf');
}

function setup() {
  createCanvas(1000, 1000, WEBGL);
  pg = createGraphics(2 * TILES_X, 2 * TILES_Y, WEBGL);
  pg.smooth();
   pg.directionalLight(200, 200, 200, -1, 0, -1);
   pg.directionalLight(255, 255, 255, 1, 0, -1);
  pointLight(255, 255, 255, 500, 500, 500);
  specularColor(255, 255, 255);
  TILE_W = width / TILES_X;
  TILE_H = height / TILES_Y;
  textFont(font);
  textSize(TILE_W);
  textAlign(CENTER, CENTER);
}

function draw() {
  background("#ffffff");
  noStroke();
  pg.push();
  pg.clear();
  pg.noStroke();
  pg.background(0);
  pg.fill(255);
  pg.rotateX(PI);
  pg.rotateX(radians(-30)); 

  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
    currentAngleY += 0.02; //тут меняется скорость, на демо была 0.1
    currentAngleX = lerp(currentAngleX, 0, 0.1); 
    currentAngleZ = lerp(currentAngleZ, 0, 0.1); 
  } else {
    targetAngleX = -radians(mouseY) / 4; 
    targetAngleY = radians(mouseX) / 4; 
    targetAngleZ = 0; 
    currentAngleX = lerp(currentAngleX, targetAngleX, 0.1); 
    currentAngleY = lerp(currentAngleY, targetAngleY, 0.1); 
    currentAngleZ = lerp(currentAngleZ, targetAngleZ, 0.1); 
  }

  pg.rotateX(currentAngleX);
  pg.rotateY(currentAngleY);
  pg.rotateZ(currentAngleZ);
  pg.rotateY(PI / 2); 
  pg.scale(0.7);
  pg.model(myModel);
  pg.pop();
  let buffer = pg.get();

  for (let x = 0; x < TILES_X; x++) {
    for (let y = 0; y < TILES_Y; y++) {
      let c = buffer.get(x * 2, y * 2);
      let b = brightness(c);

      let asciiChar;
      if (b > 1 & b <= 15) {
        asciiChar = asciiChars.charAt(0); 
      } else if (b > 15 & b <= 30) {
        asciiChar = asciiChars.charAt(1); 
      } else if (b > 30 & b <= 45) {
        asciiChar = asciiChars.charAt(2); 
      } else if (b > 45 & b <= 60) {
        asciiChar = asciiChars.charAt(3); 
      } else if (b > 60 & b <= 75) {
        asciiChar = asciiChars.charAt(4); 
      } else if (b > 75 & b <= 90) {
        asciiChar = asciiChars.charAt(5);
			} else if (b > 90 & b <= 100) {
        asciiChar = asciiChars.charAt(6);
			} else {
        asciiChar = ' ';  
      }

      push();
      let posX = x * TILE_W + TILE_W / 2 - width / 2;
      let posY = y * TILE_H + TILE_H / 2 - height / 2;
      translate(posX, posY);
      fill(0, 0, 255); //тут менять цвет
      text(asciiChar, 0, 0);
      pop();
    }
  }

  //image(pg, -width / 2, -height / 2, width / 8, height / 8); 
}
