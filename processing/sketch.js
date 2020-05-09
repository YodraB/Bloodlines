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
  bluemask = loadImage('images/Khundii_BlueMask.png');
  tips = loadImage('images/Khundii_Tips.png');
  tipsmask = loadImage('images/Khundii_TipsMask.png');
  reversetips = loadImage('images/Khundii_ReverseTips.png');
  reversetipsmask = loadImage('images/Khundii_ReverseTipsMask.png');
  agouti = loadImage('images/Khundii_Agouti.png');
  headstripe = loadImage('images/Khundii_Agouti_Headstripe.png');
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
    console.log('loading');
    //var genes = randomGenes();
    //console.log(genes)
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

function randomGenes(){
  var genotype = "";
  var geneList = [];
  
  var redGround = ['R', 'P', 'r'];
  var blue = ['B', 'y', 'b'];
  var extension = ['M', 'E', 'r', 'n'];
  var redPattern = ['P', 's', 'g'];
  var domBlack = ['K', 'b', 'k'];
  var agoutiGen = ['Y', 'W', 't', 'a'];
  var birdDilute = ['S', 'c', 'g', 's'];
  

	for (i = 0; i < 31 * 2; i++){
    if (i == 0 || i == 1){
      geneList = redGround;
    } else if (i == 18 || i == 19) {
      geneList = blue;
    } else if (i == 20 || i == 21){
      geneList = extension;
    } else if (i == 22 || i == 23){
      geneList = redPattern;
    } else if (i == 30 || i == 31){
      geneList = domBlack;
    } else if (i == 40 || i == 41){
      geneList = agoutiGen;
    } else if (i == 44 || i == 45){
      geneList = birdDilute;
    } else {
      geneList = ['A', 'a'];
    }
    
		genotype += randomPick(geneList);
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

function makeNoise(noiseScale, coeff, mask){
  // Coeff 0.8 makes small blotches; 1.8 makes huge patches
  let time = new Date;
  time = time.getMilliseconds();

  if (mask == ground){
    noiseImageLegs = noiseImageCreate(time - 70, noiseScale, coeff)
    noiseImageLegs.mask(back);
    image(noiseImageLegs, 0 , 0);

    noiseImage = noiseImageCreate(time, noiseScale, coeff)
    noiseImage.mask(front);
    image(noiseImage, 0 , 0);
  } else if (mask == bluemask){
    noiseImage = noiseImageCreate(time, noiseScale, coeff)
    noiseImage.mask(bluemask);
    image(noiseImage, 0 , 0);
  }
  
}

function makeTint(colorValue, alpha, mode){
  let tintImage = createImage(width, height);
  tintImage.loadPixels();
  for (let x = 0; x < tintImage.width; x++){
    for (let y = 0; y < tintImage.height; y++){
      tintImage.set(x, y, color(red(colorValue), green(colorValue), blue(colorValue), alpha * 255));
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

function distort(sourceImage, amount, scale, mask, blendmode, colorValue){
  //default amount 100, scale 0.01
  let time = new Date;
  time = time.getMilliseconds();
  noiseSeed(time);
  let vectorField = [];
  for (x = 0; x < sourceImage.width; x++){
    let row = [];
    for (y = 0; y < sourceImage.height; y++){
      let vector = createVector(amount*(noise(scale*x,scale*y)-0.5), 4*amount*(noise(100+scale*x,scale*y)-0.5));
      row.push(vector);
    }
    vectorField.push(row);
  }

  let result = [];
  sourceImage.loadPixels();
  for (j = 0; j < sourceImage.width; j++){
    for (i = 0; i < sourceImage.height; i ++){
      var res = vectorField[i][j];

      var ii = constrain(floor(i + res.x), 0, sourceImage.width - 1);
      var jj = constrain(floor(j + res.y), 0, sourceImage.height - 1);

      let source_i = (jj * sourceImage.width + ii) * 4
      let col = color(
        sourceImage.pixels[source_i],
        sourceImage.pixels[source_i + 1],
        sourceImage.pixels[source_i + 2],
        sourceImage.pixels[source_i + 3]
      );
      
      result.push(col);
    }
  }

  let distortImage = createImage(sourceImage.width, sourceImage.height);
  distortImage.loadPixels();

  for (x = 0; x<sourceImage.width; x++){
    for (y= 0; y<sourceImage.height; y++){
      let clear_i = y * sourceImage.width + x * 4;
      distortImage.pixels[clear_i] = 0;
      distortImage.pixels[clear_i + 1] = 0;
      distortImage.pixels[clear_i + 2] = 0;
      distortImage.pixels[clear_i + 3] = 0;
    }
  }
  distortImage.updatePixels();
  distortImage.loadPixels();

  for (n=0; n<sourceImage.width; n++) {
    for(m=0; m<sourceImage.height; m++){
      let result_i = m * sourceImage.width + n;
      let target_i = result_i * 4;

      let col = result[result_i];
      distortImage.pixels[target_i] = red(colorValue);
      distortImage.pixels[target_i + 1] = green(colorValue);
      distortImage.pixels[target_i + 2] = blue(colorValue);
      distortImage.pixels[target_i + 3] = alpha(col);
    }
  }

  
  distortImage.updatePixels();
  distortImage.mask(mask);
  blend(distortImage, 0, 0, imgSize, imgSize, 0, 0, size, size, blendmode);
  //console.log('distort');
}

function createPet(){
  clear();
  background(204, 229, 255);
  var genes = randomGenes();
  //for (i = 0; i < genes.length; i++){
  //  console.log(i, genes[i]);
  //}
  console.log(genes);

  //PHAEOMMELANIN

  //Blue gene
  var blueMaskVar = ground;
  var redOn = true;
  if ((genes[18] == 'y' || genes[19] == 'y') && (genes[18] != 'B' && genes[19] != 'B')){
    noTint();
    image(ground, 0, 0, size, size);
    blueMaskVar = bluemask;
  } else if (genes[18] == 'b' && genes[19] == 'b'){
    noTint();
    image(ground, 0, 0, size, size);
    redOn = false;
  } else {
    blueMaskVar = ground;
  }
  

  //Base Color - tint to set color()
  var groundColor = '';
  if (genes[0] == 'R' || genes[1] == 'R'){
    groundColor = 'red';
  } else if (genes[0] == 'P' || genes[1] == 'P'){
    groundColor = 'pink';
  } else {
    groundColor = 'white';
  }

  var groundRec = 0;
  for (i = 0; i < 8; i+=2 ){
    if (genes[i + 2] != 'A' && genes[i + 3] != 'A'){
      groundRec += 1;
    }
  }
  
  var redColorValue = [0, 0, 0];
  var pinkColorValue = [0, 0, 0];
  if (groundRec == 4){
    redColorValue = [179, 0, 0];
    pinkColorValue = [255, 51, 154];
  } else if (groundRec == 3){
    redColorValue = [255, 0, 0];
    pinkColorValue = [255, 128, 191];
  } else if (groundRec == 2){
    redColorValue = [255, 102, 0];
    pinkColorValue = [255, 179, 217];
  } else if (groundRec == 1){
    redColorValue = [255, 207, 102];
    pinkColorValue = [255, 204, 230];
  } else {
    redColorValue = [255, 255, 153];
    pinkColorValue = [255, 230, 242];
  }

  if (groundColor == 'red'){
    tint(redColorValue);
  } else if (groundColor == 'pink'){
    tint(pinkColorValue);
  } else {
    noTint();
  }
  if (redOn == true){
    image(blueMaskVar, 0, 0, size, size);
  }

  //Red Patches
  var redPatches = false;
  if (genes[10] == 'A' || genes[11] == 'A'){
    redPatches = true;
  }

  var redPatchAmount = 0;
  for (i = 0; i < 6; i+=2 ){
    if (genes[i + 12] == 'a' && genes[i + 13] == 'a'){
      redPatchAmount += 1;
    }
  }
  
  tint(redColorValue);

  if (redOn == true){
    if (redPatches == true && redPatchAmount == 1){
      makeNoise(0.02, 0.8, blueMaskVar);
    } else if (redPatches == true && redPatchAmount == 2) {
      makeNoise(0.02, 1, blueMaskVar);
    } else if (redPatches == true && redPatchAmount == 3) {
      makeNoise(0.02, 1.4, blueMaskVar);
    }
  }

  //Red pattern

  //Banding

  //EUMELANIN

  var blackColor = color(18);

  //Brown
  if (genes[38] == 'a' && genes[39] == 'a'){
    blackColor = color(87, 45, 19);
  }

  //Liver (overrides brown)
  if (genes[42] == 'a' && genes[43] == 'a'){
    blackColor = color(173, 56, 43);
  }

  //Bird Dilute (Eumelanin)
  var blackAlpha = 225;
  if (genes[44] == 'S' || genes[45] == 'S'){
    //nothing happens
  } else if ((genes[44] == 'c' && genes[45] == 'g') || (genes[44] == 'g' && genes[45] == 'c')){
    blackAlpha = 0.87 * 225; 
  } else if (genes[44] == 'c' || genes[45] == 'c'){
    blackAlpha = 0.75 * 225;
  } else if (genes[44] == 'g' || genes[45] == 'g'){
    blackAlpha = 0.5 * 225;
  }
  blackColor.setAlpha(blackAlpha);

  //Dominant black
  if (genes[30] == 'K' || genes[31] == 'K'){
    tint(blackColor);
    image(ground, 0, 0, size, size);
  }

  //Black patches
  var blackPatches = false;
  if (genes[32] == 'A' || genes[33] == 'A'){
    blackPatches = true;
  }

  var blackPatchAmount = 0;
  for (i = 0; i < 4; i+=2 ){
    if (genes[i + 34] == 'a' && genes[i + 35] == 'a'){
      blackPatchAmount += 1;
    }
  }

  tint(blackColor);
  if (blackPatches == true && blackPatchAmount == 1){
    makeNoise(0.02, 0.8, ground);
  } else if (blackPatches == true && blackPatchAmount == 2) {
    makeNoise(0.02, 1, ground);
  }

  //Agouti - 40, 41
  if (genes[40] == 'Y' || genes[41] == 'Y'){
    distort(tips, 100, 0.001, tipsmask, NORMAL, blackColor);
  } else if (genes[40] == 'W' || genes[41] == 'W'){
    distort(agouti, 100, 0.001, maneless, NORMAL, blackColor);
  } else if (genes[40] == 't' || genes[41] == 't'){
    distort(reversetips, 100, 0.001, reversetipsmask, NORMAL, blackColor);
  }

  // ULTRASTRUCTURE

  var blueColor = color(77, 210, 255);

  //Grey
  if (genes[46] == 'a' && genes[47] == 'a'){
    //blueColor = color(177);
  }

  //Violet
  if (genes[48] == 'a' && genes[49] == 'a'){
    //blueColor = color(189, 189, 255);
  } else if (genes[48] == 'a' || genes[49] == 'a'){
    if (blueColor = color(77, 210, 255)){ //skyblue
      //blueColor = color(144, 144, 255);
    } else {
      //blueColor = color(162, 162, 193);
    }
  }

  //Clear
  var blueOn = true;
  if (genes[54] == 'a' && genes[55] == 'a'){
    blueOn = false;
  }

  //Bird dilute
  var blueAlpha = 0.5;
  if (genes[44] == 'S' || genes[45] == 'S'){
    //nothing happens
  } else if ((genes[44] == 'c' && genes[45] == 'g') || (genes[44] == 'g' && genes[45] == 'c')){
    //blueAlpha *= 0.4; 
  } else if (genes[44] == 'c' || genes[45] == 'c'){
    //blueAlpha *= 0.9;
  } else if (genes[44] == 'g' || genes[45] == 'g'){
    //blackAlpha *= 0.5;
  } else {
    //blueAlpha *= 0.1;
  }

  //Base blue here
  if (blueOn){
    //makeTint(blueColor, blueAlpha, HARD_LIGHT);
  }

  //Dark
  var realBlack = color(0);
  if (genes[50] == 'A' && genes[51]== 'A'){
    //makeTint(realBlack, 0.25, MULTIPLY);
  } else if (genes[50] == 'A' || genes[51] == 'A'){
    //makeTint(realBlack, 0.12, MULTIPLY);
  }

  //Anthracite
  if (genes[52] == 'A' && genes[53] == 'A'){
    //makeTint(realBlack, 0.75, MULTIPLY);
  } else if (genes[52] == 'A' || genes[53] == 'A'){
    //makeTint(realBlack, 0.37, MULTIPLY);
  }
  
  //WHITE
  tint(255);

  //Tobiano
  if (genes[56] == 'a' && genes[57] == 'a'){
    makeNoise(0.008, 1, ground);
  }
  
  //Overo
  if (genes[58] == 'a' && genes[59] == 'a'){
    makeNoise(0.05, 0.8, ground);
  }
  
  //Dilute
  if (genes[60] == 'a' && genes[61] == 'a'){
    makeTint(color(255), 0.7, SCREEN);
  }
  
  //Mane
  tint(0);
  image(mane, 0, 0, size, size);

  
  //Agouti - default amount 100, scale 0.001
  //distort(agouti, 100, 0.001, maneless, MULTIPLY);
  //blend(headstripe, 0, 0, imgSize, imgSize, 0, 0, size, size, MULTIPLY);

  //Socks - x, width, midpoint, minrandom, maxrandom, mask; tint to set color
  //tint(255);

  //Front left - 30 smallest, 300 largest
  //makeSock(150, 85, 40, 30, 220, frontleft);

  //Back left - 30 smallest, 270 largest
  //makeSock(350, 175, 180, 160, 270, backleft);

  //Front right - 40 smallest, 220 largest
  //makeSock(100, 85, 40, 40, 40, back);

  //Back right - 75 smallest, 270 largest
  //makeSock(500, 85, 70, 75, 270, backright);

  //Eye - tint to set color
  tint(255, 250, 205);
  image(eye, 0, 0, size, size);

  //Lines
  image(lines, 0, 0, size, size);

  console.log('done');
}