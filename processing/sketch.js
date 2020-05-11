let ground;
let eye;
let lines;
var newOver = false;
var codeOver = false;
var saveOver = false;
let imgSize = 2048;
let inputBox;
let textBox;

function preload(){
  ground = loadImage('images/Khundii_Base.png');
  front = loadImage('images/Khundii_Front.png');
  back = loadImage('images/Khundii_Back.png');
  frontleft = loadImage('images/Khundii_FrontLeft.png');
  backleft = loadImage('images/Khundii_BackLeft.png');
  backright = loadImage('images/Khundii_BackRight.png');
  bluemask = loadImage('images/Khundii_BlueMask.png');
  extension = loadImage('images/Khundii_Extension.png');
  exmask = loadImage('images/Khundii_ExMask.png');
  tips = loadImage('images/Khundii_Tips.png');
  tipsmask = loadImage('images/Khundii_TipsMask.png');
  reversetips = loadImage('images/Khundii_ReverseTips.png');
  reversetipsmask = loadImage('images/Khundii_ReverseTipsMask.png');
  agouti = loadImage('images/Khundii_Agouti.png');
  headstripe = loadImage('images/Khundii_Agouti_Headstripe.png');
  maneless = loadImage('images/Khundii_Maneless.png');
  star = loadImage('images/Khundii_Star.png');
  stripe = loadImage('images/Khundii_Stripe.png');
  blaze = loadImage('images/Khundii_Blaze.png');
  bald = loadImage('images/Khundii_Bald.png');
  starmask = loadImage('images/Khundii_StarMask.png');
  stripemask = loadImage('images/Khundii_StripeMask.png');
  blazemask = loadImage('images/Khundii_BlazeMask.png');
  baldmask = loadImage('images/Khundii_BaldMask.png');
  mane = loadImage('images/Khundii_Mane.png');
  eye = loadImage('images/Khundii_Eye.png');
  lines = loadImage('images/Khundii_Line.png');
  test = loadImage('images/test.png');
}

function setup() {
  // put setup code here
  size = 600;
	createCanvas(size, size);
  background(204, 229, 255);
  textAlign(CENTER, CENTER);

  image(ground, 0, 0, size, size);
  createElement('br');
  inputBox = createInput('Code Here');
  inputBox.size(600);
  inputBox.input(myInputEvent);
  textBox = createElement('p');
  randomButton = createButton('random pet');
  randomButton.mousePressed(randompress);
  codeButton = createButton('code pet');
  codeButton.mousePressed(codepress);
  
  image(lines, 0, 0, size, size);
}

function randompress() {
  createPet('random');
}

function codepress() {
  createPet('code');
}

function myInputEvent(){
  console.log(this.value());
}

function draw() {
  // put drawing code here
  //fill(255);
  //rect(40, 40, 100, 30);
  //fill(0);
  //text('random pet', 100/2 + 40, 30/2 + 40);

  //fill(255);
  //rect(230, 40, 100, 30);
  //fill(0);
  //text('code pet', 100/2 + 230, 30/2 + 40);

  //fill(255);
  //rect(350, 40, 100, 30);
  //fill(0);
  //text('save pet', 100/2 + 350, 30/2 + 40);

  if (mouseX >= 40 && mouseX <= 40 + 100 &&
    mouseY >= 40 && mouseY <= 40 + 30){
      //checks if mouse is over button
      newOver = true;
  } else {
    newOver = false;
  }

  if (mouseX >= 230 && mouseX <= 230 + 100 &&
    mouseY >= 40 && mouseY <= 40 + 30){
      //checks if mouse is over button
      codeOver = true;
  } else {
    codeOver = false;
  }

  if (mouseX >= 350 && mouseX <= 350 + 100 &&
    mouseY >= 40 && mouseY <= 40 + 30){
      //checks if mouse is over button
      saveOver = true;
  } else {
    saveOver = false;
  }
}

function mousePressed() {
  //if mouse is over button when mouse is pressed, button is pressed
  if (newOver) {
    //createPet('random');
  } else if (codeOver) {
    //createPet('code');
  } else if (saveOver){
    //saveCanvas('Khundii', 'png');
  }
}

function randomPick(array) {
	var randomNumber = Math.floor(Math.random() * (array.length));
	return array[randomNumber];
}

function randomGenes(){
  var genotype = "";
  var geneList = [];
  
  var redGround = ['R', 'P', 'r'];
  var blue = ['B', 'y', 'b'];
  var extension = ['M', 'E', 'r'];
  var domBlack = ['K', 'b', 'k'];
  var agoutiGen = ['Y', 'W', 't', 'a'];
  var birdDilute = ['S', 'c', 'g', 's'];
  

	for (i = 0; i < 81; i++){
    if (i == 0 || i == 1){
      geneList = redGround;
    } else if (i == 18 || i == 19) {
      geneList = blue;
    } else if (i == 20 || i == 21){
      geneList = extension;
    } else if (i == 22 || i == 23){
      geneList = domBlack;
    } else if (i == 32 || i == 33){
      geneList = agoutiGen;
    } else if (i == 36 || i == 37){
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
  var variance = random(-50, 50);
  var y = size - 25;
  //console.log(variance);
  sockGraphic = createGraphics(size, size);
  sockGraphic.noStroke();
  sockGraphic.fill(255, 255, 255);
  sockGraphic.beginShape();
  sockGraphic.vertex(x, y);
  sockGraphic.vertex(x + width, y);
  sockGraphic.vertex(x + width, y - height);
  if (mask == backleft && height > 140){
    sockGraphic.bezierVertex(x + width, y - height, x + midwidth, y - (height + 50), x, y - (height + variance - 80));
  } else if (mask == backright && height > 30){
    sockGraphic.bezierVertex(x + width, y - height, x + midwidth, y - (height + 50), x, y - (height + variance - 80));
  } else {
    sockGraphic.bezierVertex(x + width, y - height, x + midwidth, y - (height + 50), x, y - (height + variance));
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
      distortImage.pixels[target_i + 3] = alpha(col) - (255 - alpha(colorValue));
    }
  }

  
  distortImage.updatePixels();
  distortImage.mask(mask);
  blend(distortImage, 0, 0, imgSize, imgSize, 0, 0, size, size, blendmode);
  //console.log('distort');
}

function createPet(petValue){
  clear();
  background(204, 229, 255);
  var genes = '';
  if (petValue == 'random'){
    genes = randomGenes();
  } else {
    genes = inputBox.value();
  }
  textBox.html(genes);
  //for (i = 0; i < genes.length; i++){
  //  console.log(i, genes[i]);
  //}
  console.log(genes);

  //Gene assignment
  var groundColorGenes = genes[0] + genes[1];
  var groundRecGenes = genes.slice(2, 10);
  var redPatchGenes = genes[10] + genes[11];
  var redPatchAmountGenes = genes.slice(12, 18)
  var blueGenes = genes[18] + genes[19];
  var extensionGenes = genes[20] + genes[21];
  var domBlackGenes = genes[22] + genes[23];
  var blackPatchGenes = genes[24] + genes[25];
  var blackPatchAmountGenes = genes.slice(26, 30);
  var brownGenes = genes[30] + genes[31];
  var agoutiGenes = genes[32] + genes[33];
  var liverGenes = genes[34] + genes[35];
  var birdDiluteGenes = genes[36] + genes[37];
  var greyGenes = genes[38] + genes[39];
  var violetGenes = genes[40] + genes[41];
  var darkGenes = genes[42] + genes[43];
  var anthraciteGenes = genes[44] + genes[45];
  var clearGenes = genes[46] + genes[47];
  var tobianoGenes = genes[48] + genes[49];
  var overoGenes = genes[50] + genes[51];
  var diluteGenes = genes[52] + genes[53];
  var whiteFaceGenes = genes.slice(54, 62);
  var frontLeftSockGenes = genes.slice(62, 66);
  var frontRightSockGenes = genes.slice(66, 70);
  var backLeftSockGenes = genes.slice(70, 74);
  var backRightSockGenes = genes.slice(74, 78);
  var sockHeightGenes = genes[79] + genes[80];

  //PHAEOMELANIN

  //Blue gene
  var blueMaskVar = ground;
  var redOn = true;
  if ((blueGenes[0] == 'y' || blueGenes[1] == 'y') && (blueGenes[0] != 'B' && blueGenes[1] != 'B')){
    noTint();
    image(ground, 0, 0, size, size);
    blueMaskVar = bluemask;
  } else if (blueGenes[0] == 'b' && blueGenes[1] == 'b'){
    noTint();
    image(ground, 0, 0, size, size);
    redOn = false;
  } else {
    blueMaskVar = ground;
  }
  

  //Base Color - tint to set color()
  var groundColor = '';
  if (groundColorGenes[0] == 'R' || groundColorGenes[1] == 'R'){
    groundColor = 'red';
  } else if (groundColorGenes[0] == 'P' || groundColorGenes[1] == 'P'){
    groundColor = 'pink';
  } else {
    groundColor = 'white';
  }

  var groundRec = 0;
  for (i = 0; i < groundRecGenes.length; i+= 2 ){
    if (groundRecGenes[i] != 'A' && groundRecGenes[i + 1] != 'A'){
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
  if (redPatchGenes[0] == 'A' || redPatchGenes[1] == 'A'){
    redPatches = true;
  }

  var redPatchAmount = 0;
  for (i = 0; i < redPatchAmountGenes.length; i+=2 ){
    if (redPatchAmountGenes[i] == 'a' && redPatchAmountGenes[i + 1] == 'a'){
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

  //EUMELANIN

  var blackColor = color(18);

  //Brown
  if (brownGenes[0] == 'a' && brownGenes[1] == 'a'){
    blackColor = color(87, 45, 19);
  }

  //Liver (overrides brown)
  if (liverGenes[0] == 'a' && liverGenes[1] == 'a'){
    blackColor = color(173, 56, 43);
  }

  //Bird Dilute (Eumelanin)
  var blackAlpha = 225;
  if (birdDiluteGenes[0] == 'S' || birdDiluteGenes[1] == 'S'){
    //nothing happens
  } else if (birdDiluteGenes == 'cg' || birdDiluteGenes == 'gc'){
    blackAlpha -= 0.87 * 225; 
  } else if (birdDiluteGenes[0] == 'c' || birdDiluteGenes[1] == 'c'){
    blackAlpha -= 0.75 * 225;
  } else if (birdDiluteGenes[0] == 'g' || birdDiluteGenes[1] == 'g'){
    blackAlpha -= 0.5 * 225;
  }

  blackColor.setAlpha(blackAlpha);

  //Extension
  if (extensionGenes[0] == 'M' || extensionGenes[1] == 'M'){
    distort(extension, 100, 0.003, exmask, NORMAL, blackColor);
  } else if (extensionGenes[0] == 'r' && extensionGenes[1] == 'r'){
    blackAlpha = 0;
  }

  blackColor.setAlpha(blackAlpha);

  //Dominant black
  if (domBlackGenes[0] == 'K' || domBlackGenes[1] == 'K'){
    tint(blackColor);
    image(ground, 0, 0, size, size);
  }

  //Black patches
  var blackPatches = false;
  if (blackPatchGenes[0] == 'A' || blackPatchGenes[1] == 'A'){
    blackPatches = true;
  }

  var blackPatchAmount = 0;
  for (i = 0; i < blackPatchAmountGenes.length; i+=2 ){
    if (blackPatchAmountGenes[i] == 'a' && blackPatchAmountGenes[i + 1] == 'a'){
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
  if (agoutiGenes[0] == 'Y' || agoutiGenes[1] == 'Y'){
    distort(tips, 100, 0.002, tipsmask, NORMAL, blackColor);
  } else if (agoutiGenes[0] == 'W' || agoutiGenes[1] == 'W'){
    distort(agouti, 100, 0.002, maneless, NORMAL, blackColor);
    tint(blackColor);
    image(headstripe, 0, 0, size, size);
  } else if (agoutiGenes[0] == 't' || agoutiGenes[1] == 't'){
    distort(reversetips, 100, 0.002, reversetipsmask, NORMAL, blackColor);
  }

  // ULTRASTRUCTURE

  var blueColor = color(77, 210, 255);

  //Grey
  if (greyGenes[0] == 'a' && greyGenes[1] == 'a'){
    blueColor = color(177);
  }

  //Violet
  if (violetGenes[0] == 'a' && violetGenes[1] == 'a'){
    blueColor = color(189, 189, 255);
  } else if (violetGenes[0] == 'a' || violetGenes[1] == 'a'){
    if (blueColor = color(77, 210, 255)){ //skyblue
      blueColor = color(144, 144, 255);
    } else {
      blueColor = color(162, 162, 193);
    }
  }

  //Clear
  var blueOn = true;
  if (clearGenes[0] == 'a' && clearGenes[1] == 'a'){
    blueOn = false;
  }

  //Bird dilute
  var blueAlpha = 0.5;
  if (genes[44] == 'S' || genes[45] == 'S'){
    //nothing happens
  } else if ((genes[44] == 'c' && genes[45] == 'g') || (genes[44] == 'g' && genes[45] == 'c')){
    blueAlpha *= 0.4; 
  } else if (genes[44] == 'c' || genes[45] == 'c'){
    blueAlpha *= 0.9;
  } else if (genes[44] == 'g' || genes[45] == 'g'){
    blueAlpha *= 0.5;
  } else {
    blueAlpha *= 0.1;
  }

  //Base blue here
  if (blueOn){
    makeTint(blueColor, blueAlpha, HARD_LIGHT);
  }

  //Dark
  var realBlack = color(0);
  if (darkGenes[0] == 'A' && darkGenes[1] == 'A'){
    makeTint(realBlack, 0.25, MULTIPLY);
  } else if (darkGenes[0] == 'A' || darkGenes[1] == 'A'){
    makeTint(realBlack, 0.12, MULTIPLY);
  }

  //Anthracite
  if (anthraciteGenes[0] == 'A' && anthraciteGenes[1] == 'A'){
    makeTint(realBlack, 0.75, MULTIPLY);
  } else if (anthraciteGenes[0] == 'A' || anthraciteGenes[1] == 'A'){
    makeTint(realBlack, 0.37, MULTIPLY);
  }
  
  //WHITE
  tint(255);

  //Tobiano
  if (tobianoGenes[0] == 'a' && tobianoGenes[1] == 'a'){
    makeNoise(0.008, 1, ground);
  }
  
  //Overo
  if (overoGenes[0] == 'a' && overoGenes[1] == 'a'){
    makeNoise(0.05, 0.8, ground);
  }
  
  //Dilute
  if (diluteGenes[0] == 'a' && diluteGenes[1] == 'a'){
    makeTint(color(255), 0.7, SCREEN);
  }

  //Face White
  var whiteFaceAmount = 0;
  for (i = 0; i < whiteFaceGenes.length; i+=2 ){
    if (whiteFaceGenes[i] == 'a' && whiteFaceGenes[i + 1] == 'a'){
      whiteFaceAmount += 1;
    }
  }

  if (whiteFaceAmount == 1){
    distort(star, 25, 0.02, starmask, NORMAL, color(255));
  } else if (whiteFaceAmount == 2){
    distort(stripe, 25, 0.02, stripemask, NORMAL, color(255));
  } else if (whiteFaceAmount == 3){
    distort(blaze, 25, 0.01, blazemask, NORMAL, color(255));
  } else if (whiteFaceAmount == 4){
    distort(bald, 50, 0.02, baldmask, NORMAL, color(255));
  }
  
  //Socks - x, width, midpoint, minrandom, maxrandom, mask; tint to set color
  tint(255);
  
  //Sock Height
  var sockHeightNum = 0;
  for (i = 0; i < sockHeightGenes.length; i++){
    if (sockHeightGenes[i] == 'a'){
      sockHeightNum += 1;
    }
  }
  
  var sockHeightMin = 0;
  var sockHeightMax = 0;
  if (sockHeightNum == 0){
    sockHeightMin = 15;
    sockHeightMax = 50;
  } else if (sockHeightNum == 1){
    sockHeightMin = 50;
  	sockHeightMax = 130;
  } else if (sockHeightNum == 2){
    sockHeightMin = 130;
  	sockHeightMax = 200;
  }
  console.log(sockHeightNum)

  //Front left - 15 smallest, 200 largest
  if (frontLeftSockGenes == 'aaaa'){
  	makeSock(100, 135, 40, sockHeightMin, sockHeightMax, frontleft);
  }

  //Back left - 30 smallest, 270 largest
  if (backLeftSockGenes == 'aaaa'){
    if (sockHeightNum == 2){
      makeSock(320, 130, 87, sockHeightMin + 30, sockHeightMax + 50, backleft);
    } else if (sockHeightNum == 1) {
      makeSock(320, 130, 87, sockHeightMin, sockHeightMax + 40, backleft);
    } else {
      makeSock(320, 130, 87, sockHeightMin, sockHeightMax, backleft);
    }
  }

  //Front right - 40 smallest, 220 largest
  if (frontRightSockGenes == 'aaaa'){
    if (sockHeightNum == 0){
      makeSock(100, 85, 40, sockHeightMin + 40, sockHeightMax, back);
    } else {
      makeSock(100, 85, 40, sockHeightMin, sockHeightMax, back);
    }
  }

  //Back right - 75 smallest, 270 largest
  if (backRightSockGenes == 'aaaa'){
    if (sockHeightNum == 2){
      makeSock(420, 85, 70, sockHeightMin + 30, sockHeightMax + 50, backright);
    } else if (sockHeightNum == 1){
      makeSock(420, 85, 70, sockHeightMin, sockHeightMax + 40, backright);
    } else {
      makeSock(420, 85, 70, sockHeightMin, sockHeightMax, backright);
    }
  }
  
  
  //Mane
  tint(0);
  image(mane, 0, 0, size, size);

  //Back right - 75 smallest, 270 largest
  //makeSock(500, 85, 70, 75, 270, backright);

  //Eye - tint to set color
  tint(255, 250, 205);
  image(eye, 0, 0, size, size);

  //Lines
  image(lines, 0, 0, size, size);

  console.log('done');
}