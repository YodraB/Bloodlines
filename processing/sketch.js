let ground;
let eye;
let lines;
var rectOver = false;
let imgSize = 2048;

function preload(){
  ground = loadImage('images/Khundii_Base.png');
  front = loadImage('images/Khundii_Front.png');
  back = loadImage('images/Khundii_Back.png');
  frontleft = loadImage('images/Khundii_FrontLeft.png');
  backleft = loadImage('images/Khundii_BackLeft.png');
  backright = loadImage('images/Khundii_BackRight.png');
  agouti = loadImage('images/Khundii_Agouti.png');
  maneless = loadImage('images/Khundii_Maneless.png');
  mane = loadImage('images/Khundii_Mane.png');
  eye = loadImage('images/Khundii_Eye.png');
  lines = loadImage('images/Khundii_Line.png');
  test = loadImage('images/test.png');
}

function setup() {
  // put setup code here
  size = 700;
	createCanvas(size, size);
  background(204, 229, 255);
  textAlign(CENTER, CENTER);

  //tint(0, 153, 255);
  image(ground, 0, 0, size, size);
  
  image(lines, 0, 0, size, size);
}

function draw() {
  // put drawing code here
  fill(255);
  rect(40, 40, 100, 30);
  fill(0);
  text('new pet', 100/2 + 40, 30/2 + 40);

  if (mouseX >= 40 && mouseX <= 40 + 100 &&
    mouseY >= 40 && mouseY <= 40 + 30){
      //checks if mouse is over button
      rectOver = true;
  } else {
    rectOver = false;
  }
  //makeShape(350, 350);
}

function mousePressed() {
  //if mouse is over button when mouse is pressed, button is pressed
  if (rectOver) {
    createPet();
  }
}

//function touchEnded(){
//	createPet();
//}

function randomPick(array) {
	var randomNumber = Math.floor(Math.random() * (array.length));
	return array[randomNumber];
}

function randomGenes(geneNumber){
	genotype = "";
	for (i = 0; i < geneNumber * 2; i++){
		genotype += randomPick(['A','a']);
  	}
  	return genotype;
}

function noiseImageCreate(time, noiseScale, coeff){
  let noiseImage = createImage(width, height, RGB);
  noiseImage.loadPixels();
  for (let i = 0; i < noiseImage.width; i++){
    for (let j = 0; j < noiseImage.height; j++){
      let noiseVal = Math.round(noise(i * noiseScale, j * noiseScale, time) * coeff);
      noiseImage.set(i, j, color(255, 255, 255, noiseVal * 255));
    }
  }
  noiseImage.updatePixels();
  return noiseImage
}

function makeNoise(noiseScale, coeff){
  // Coeff 0.8 makes small blotches; 1.8 makes huge patches
  let time = new Date;
  time = time.getMilliseconds();

  noiseImageLegs = noiseImageCreate(time - 70, noiseScale, coeff)
  noiseImageLegs.mask(back);
  image(noiseImageLegs, 0 , 0);

  noiseImage = noiseImageCreate(time, noiseScale, coeff)
  noiseImage.mask(front);
  image(noiseImage, 0 , 0);
}

function makeTint(red, green, blue, alpha, mode){
  let tintImage = createImage(width, height);
  tintImage.loadPixels();
  for (let x = 0; x < tintImage.width; x++){
    for (let y = 0; y < tintImage.height; y++){
      tintImage.set(x, y, color(red, green, blue, alpha * 255));
    }
  }
  tintImage.updatePixels();
  tintImage.mask(ground);
  blend(tintImage, 0, 0, size, size, 0, 0, size, size, mode);
}

function makeSock(x, width, midwidth, minHeight, maxHeight, mask){
  var height = random(minHeight, maxHeight)
  sockGraphic = createGraphics(size, size);
  sockGraphic.noStroke();
  sockGraphic.fill(255, 255, 255);
  sockGraphic.beginShape();
  sockGraphic.vertex(x, 675);
  sockGraphic.vertex(x + width, 675,);
  sockGraphic.vertex(x + width, 675 - height);
  if (mask == backleft && height > 155){
    sockGraphic.bezierVertex(x + width, 675 - height, x + midwidth, 675 - (height + 50), x, 675 - (height + random(-50, 50) - 80));
  } else if (mask == backright){
    sockGraphic.bezierVertex(x + width, 675 - height, x + midwidth, 675 - (height + 50), x, 675 - (height + random(-50, 50) - 80));
  } else {
    sockGraphic.bezierVertex(x + width, 675 - height, x + midwidth, 675 - (height + 50), x, 675 - (height + random(-50, 50)));
  }
  sockGraphic.endShape();
  var Sock = createImage(size, size);
  Sock.copy(sockGraphic, 0, 0, sockGraphic.width, sockGraphic.height, 0, 0, sockGraphic.width, sockGraphic.height);
  Sock.mask(mask);
  image(Sock, 0, 0);
}

function distort(sourceImage){
  let vectorField = [];
  var amount = 100;
  var scale = 0.01;
  for (x = 0; x < sourceImage.width; x++){
    let row = [];
    for (y = 0; y < sourceImage.height; y++){
      let vector = createVector(amount*(noise(scale*x,scale*y)-0.5), 4*amount*(noise(100+scale*x,scale*y)-0.5))
      row.push(vector);
    }
    vectorField.push(row);
  }
  
  var result = [];
  sourceImage.loadPixels();
  for (i = 0; i < sourceImage.width; i++){
    for (j = 0; j < sourceImage.height; j += 4){
      var res = vectorField[i][j];
      //console.log(res);

      var ii = constrain(floor(i + res.x), 0, sourceImage.width - 1);
      var jj = constrain(floor(i + res.y), 0, sourceImage.height - 1);
      //console.log(ii, jj);
      
      result[i + sourceImage.width * j] = color(sourceImage.pixels[i + sourceImage.width * j], sourceImage.pixels[1 + i + sourceImage.width * j], sourceImage.pixels[2 + i + sourceImage.width * j], sourceImage.pixels[3 + i + sourceImage.width * j]);
      //console.log(i*sourceImage.width + j, 1 + i*sourceImage.width + j, 2 + i*sourceImage.width + j, 3 + i*sourceImage.width + j)
    }
  }

  for (n=0; n<sourceImage.width; n++) {
    for(m=0; m<sourceImage.height; m++){
      sourceImage.set(n, m, result[n * sourceImage.width + m]);
      //console.log(n * sourceImage.width + m)
    }
  }
  
  sourceImage.updatePixels();
  image(sourceImage, 0, 0, size, size);
  console.log('distort');
}

function createPet(){
  var genes = randomGenes(5);
  console.log(genes)

  //Base Color - tint to set color()
  if (genes[0] != 'A' || genes[1] != 'A'){
    tint(50);
  } else {
    noTint();
  }
  image(ground, 0, 0, size, size);

  //Noise Under Tint  - makeNoise(scale, patch size)
  tint(200);
  makeNoise(0.02, 1);

  //Mane Base Color - tint to set color
  tint(75);
  image(mane, 0, 0, size, size);

  //Tint Over Mane - r, g, b, a, mode
  makeTint(255, 0, 255, 0.5, OVERLAY);

  //Agouti
  agouti.mask(maneless);
  blend(agouti, 0, 0, imgSize, imgSize, 0, 0, size, size, MULTIPLY);

  //Socks - x, width, midpoint, minrandom, maxrandom, mask; tint to set color
  tint(255);

  //Front left - 30 smallest, 300 largest
  makeSock(150, 85, 40, 30, 220, frontleft);

  //Back left - 30 smallest, 270 largest
  //makeSock(350, 175, 180, 160, 270, backleft);

  //Front right - 40 smallest, 220 largest
  makeSock(100, 85, 40, 40, 40, back);

  //Back right - 75 smallest, 270 largest
  makeSock(500, 85, 70, 75, 270, backright);

  //Star
  tint(255);

  distort(test);
  //image(test, 0, 0, size, size);
  

  //Eye - tint to set color
  noTint();
  image(eye, 0, 0, size, size);

  //Lines
  image(lines, 0, 0, size, size);
}