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
  var agoutiGen = ['Y', 'W', 't', 'a'];
  var birdDilute = ['S', 'c', 'g', 's'];
  

	for (i = 0; i < 94; i++){ //47 genes (94 alleles)
    if (i == 0 || i == 1){
      geneList = redGround;
    } else if (i == 18 || i == 19) {
      geneList = blue;
    } else if (i == 20 || i == 21){
      geneList = extension;
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

function makeTint(colorValue, alpha, mode, mask){
  let tintImage = createImage(width, height);
  tintImage.loadPixels();
  for (let x = 0; x < tintImage.width; x++){
    for (let y = 0; y < tintImage.height; y++){
      tintImage.set(x, y, color(red(colorValue), green(colorValue), blue(colorValue), alpha * 255));
    }
  }
  tintImage.updatePixels();
  tintImage.mask(mask);
  blend(tintImage, 0, 0, size, size, 0, 0, size, size, mode);
}

function tintNoise(noiseScale, coeff, mask, colorValue, alphaVal, mode){
  let time = new Date;

  time = time.getMilliseconds();

  if (mask == ground){
      noiseImageLegs = noiseImageCreate(time - 70, noiseScale, coeff)
      for (let x = 0; x < noiseImageLegs.width; x++){
          for (let y = 0; y < noiseImageLegs.height; y++){
              noiseImageLegs.set(x, y, color(red(colorValue), green(colorValue), blue(colorValue), alphaVal * noiseImageLegs.pixels[(y * noiseImageLegs.width + x) * 4 + 3] ) );
          }
      }
      noiseImageLegs.updatePixels();
      noiseImageLegs.mask(back);
      blend(noiseImageLegs, 0 , 0, size, size, 0, 0, size, size, mode);

      noiseImage = noiseImageCreate(time, noiseScale, coeff)
      for (let x = 0; x < noiseImage.width; x++){
          for (let y = 0; y < noiseImage.height; y++){
              noiseImage.set(x, y, color(red(colorValue), green(colorValue), blue(colorValue), alphaVal * noiseImage.pixels[(y * noiseImage.width + x) * 4 + 3] ) );
          }
      }
      noiseImage.updatePixels();
      noiseImage.mask(front);
      blend(noiseImage, 0 , 0, size, size, 0, 0, size, size, mode);
      //image(noiseImage, 0 , 0);
      
  } else if (mask == bluemask){
      noiseImage = noiseImageCreate(time, noiseScale, coeff)
      for (let x = 0; x < noiseImage.width; x++){
          for (let y = 0; y < noiseImage.height; y++){
              noiseImage.set(x, y, color(red(colorValue), green(colorValue), blue(colorValue), alphaVal * noiseImage.pixels[(y * noiseImage.width + x) * 4 + 3] ) );
          }
      }
      noiseImage.updatePixels();
      noiseImage.mask(bluemask);
      blend(noiseImage, 0 , 0, size, size, 0, 0, size, size, mode);
  }
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

function genesGet(arrayAlleles, geneNum){
  if (geneNum == undefined){
    geneNum = 1;
  } 
  if (arrayAlleles == 'a'){
    arrayAlleles = ['A', 'a'];
  }
  var results = "";
  for (i = 0; i < geneNum * 2; i++){
    results += randomPick(arrayAlleles);
  }
  return results;
}

function createPet(petValue){
  clear();
  background(204, 229, 255);
  var genes = '';
  if (petValue == 'random'){
    //Gene assignment
    var groundColorGenes = genesGet(['R', 'P', 'r']);
    genes += groundColorGenes;
    print('groundColorGenes : ' + groundColorGenes);

    var groundRecGenes = genesGet('a', 4);
    genes += groundRecGenes;
    print('groundRecGenes : ' + groundRecGenes);

    var yellowGroundGenes = genesGet('a', 2);
    genes += yellowGroundGenes;
    print('yellowGroundGenes : ' + yellowGroundGenes);

    var desatGroundGenes = genesGet('a');
    genes += desatGroundGenes;
    print('desatGroundGenes : ' + desatGroundGenes);

    var redPatchGenes = genesGet('a');
    genes += redPatchGenes;
    print('redPatchGenes : ' + redPatchGenes);

    var redPatchAmountGenes = genesGet('a', 4);
    genes += redPatchAmountGenes;
    print('redPatchAmountGenes : ' + redPatchAmountGenes);

    var yellowPatchGenes = genesGet('a', 2);
    genes += yellowPatchGenes;
    print('yellowPatchGenes : ' + yellowPatchGenes);

    var blueGenes = genesGet(['B', 'y', 'b']);
    genes += blueGenes;
    print('blueGenes : ' + blueGenes);

    var extensionGenes = genesGet(['M', 'Y', 'r']);
    genes += extensionGenes;
    print('extensionGenes : ' + extensionGenes);

    var domBlackGenes = genesGet('a');
    genes += domBlackGenes;
    print('domBlackGenes : ' + domBlackGenes);

    var blackPatchGenes = genesGet('a');
    genes += blackPatchGenes;
    print('blackPatchGenes : ' + blackPatchGenes);

    var blackPatchAmountGenes = genesGet('a', 3);
    genes += blackPatchAmountGenes;
    print('blackPatchAmountGenes : ' + blackPatchAmountGenes);

    var brownGenes = genesGet('a');
    genes += brownGenes;
    print('brownGenes : ' + brownGenes);

    var agoutiGenes = genesGet(['Y', 'W', 't', 'a']);
    genes += agoutiGenes;
    print('agoutiGenes : ' + agoutiGenes);

    var liverGenes = genesGet('a');
    genes += liverGenes;
    print('liverGenes : ' + liverGenes);

    var birdDiluteGenes = genesGet(['S', 'c', 'g', 's']);
    genes += birdDiluteGenes;
    print('birdDiluteGenes : ' + birdDiluteGenes);

    var greyGenes = genesGet('a');
    genes += greyGenes;
    print('greyGenes : ' + greyGenes);

    var violetGenes = genesGet('a');
    genes += violetGenes;
    print('violetGenes : ' + violetGenes);

    var darkGenes = genesGet('a');
    genes += darkGenes;
    print('darkGenes : ' + darkGenes);

    var anthraciteGenes = genesGet('a');
    genes += anthraciteGenes;
    print('anthraciteGenes : ' + anthraciteGenes);

    var clearGenes = genesGet('a');
    genes += clearGenes;
    print('clearGenes : ' + clearGenes);

    var opalescentGenes = genesGet('a');
    genes += opalescentGenes;
    print('opalescentGenes : ' + opalescentGenes);

    var tobianoGenes = genesGet('a');
    genes += tobianoGenes;
    print('tobianoGenes : ' + tobianoGenes);

    var tobianoTweakGenes = genesGet('a', 2);
    genes += tobianoTweakGenes;
    print('tobianoTweakGenes : ' + tobianoTweakGenes);

    var overoGenes = genesGet('a');
    genes += overoGenes;
    print('overoGenes : ' + overoGenes);

    var overoTweakGenes = genesGet('a', 2);
    genes += overoTweakGenes;
    print('overoTweakGenes : ' + overoTweakGenes);

    var diluteGenes = genesGet('a');
    genes += diluteGenes;
    print('diluteGenes : ' + diluteGenes);

    var whiteFaceGenes = genesGet('a', 4);
    genes += whiteFaceGenes;
    print('whiteFaceGenes : ' + whiteFaceGenes);

    var frontLeftSockGenes = genesGet('a', 2);
    genes += frontLeftSockGenes;
    print('frontLeftSockGenes : ' + frontLeftSockGenes);

    var frontRightSockGenes = genesGet('a', 2);
    genes += frontRightSockGenes;
    print('frontRightSockGenes : ' + frontRightSockGenes);

    var backLeftSockGenes = genesGet('a', 2);
    genes += backLeftSockGenes;
    print('backLeftSockGenes : ' + backLeftSockGenes);

    var backRightSockGenes = genesGet('a', 2);
    genes += backRightSockGenes;
    print('backRightSockGenes : ' + backRightSockGenes);

    var sockHeightGenes = genesGet('a', 2);
    genes += sockHeightGenes;
    print('sockHeightGenes : ' + sockHeightGenes);

    var maneLightGreyGenes = genesGet('a');
    genes += maneLightGreyGenes;
    print('maneLightGreyGenes : ' + maneLightGreyGenes);

    var maneDarkGreyGenes = genesGet('a');
    genes += maneDarkGreyGenes;
    print('maneDarkGreyGenes : ' + maneDarkGreyGenes);

    var orangeTintGenes = genesGet('a', 5);
    genes += orangeTintGenes;
    print('orangeTintGenes : ' + orangeTintGenes);

    var eyeYellowGenes = genesGet('a');
    genes += eyeYellowGenes;
    print('eyeYellowGenes : ' + eyeYellowGenes);

    var tealTintGenes = genesGet('a', 4);
    genes += tealTintGenes;
    print('tealTintGenes : ' + tealTintGenes);

    var eyeBlueGenes = genesGet('a');
    genes += eyeBlueGenes;
    print('eyeBlueGenes : ' + eyeBlueGenes);

  } else {
    genes = inputBox.value();

    //read codes here
  }

  print('all genes : ' + genes);
  textBox.html(genes);

  //Opalescent - controls color selection. 'a' recessive = active
  var opalescentOn = false;
  if (opalescentGenes[0] == 'a' && opalescentGenes[1] == 'a'){
    opalescentOn = true;
  }

  //PHAEOMELANIN - (actually carotenoids but I'm not changing every time it says phaeomelanin)

  //Blue gene - controls expression of phaeomelanin. 'y' mid = phaeo restriced to face and tail. 'b' = no phaeo at all
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
  

  //Base Color - tint to set color() - controls base color of coat. 'R' dominant = red/yellow sequence. 'P' mid  = pink sequence. 'r' recessive = white.
  var groundColor = '';
  if (groundColorGenes[0] == 'R' || groundColorGenes[1] == 'R'){
    groundColor = 'red';
  } else if (groundColorGenes[0] == 'P' || groundColorGenes[1] == 'P'){
    groundColor = 'pink';
  } else {
    groundColor = 'white';
  }
  
	//Ground Rec - controls darkness of expression of base sequence. 'a' recessive = one step darker
  var groundRec = 0;
  for (i = 0; i < groundRecGenes.length; i+= 2 ){
    if (groundRecGenes[i] != 'A' && groundRecGenes[i + 1] != 'A'){
      groundRec += 1;
    }
  }
  
  var redColorValue = [0, 0, 0];
  var pinkColorValue = [0, 0, 0];
  if (groundRec == 4){
    if (opalescentOn){
      redColorValue = [197, 29, 0];
      pinkColorValue = [139, 0, 147];
    } else {
      redColorValue = [179, 0, 0];
      pinkColorValue = [255, 51, 154];
    }
  } else if (groundRec == 3){
    if (opalescentOn){
      redColorValue = [197, 29, 0];
      pinkColorValue = [191, 80, 198];
    } else {
      redColorValue = [255, 0, 0];
      pinkColorValue = [255, 128, 191];
    }
  } else if (groundRec == 2){
    if (opalescentOn){
      redColorValue = [187, 97, 0];
      pinkColorValue = [218, 117, 224];
    } else {
      redColorValue = [255, 102, 0];
      pinkColorValue = [255, 179, 217];
    }
  } else if (groundRec == 1){
    if (opalescentOn){
      redColorValue = [176, 192, 0];
      pinkColorValue = [237, 161, 242];
    } else {
      redColorValue = [255, 207, 102];
      pinkColorValue = [255, 204, 230];
    }
  } else {
    if (opalescentOn){
      redColorValue = [180, 255, 56];
      pinkColorValue = [245, 208, 247];
    } else {
      redColorValue = [255, 255, 153];
      pinkColorValue = [255, 230, 242];
    }
  }

  if (groundColor == 'red'){
    tint(redColorValue);
  } else if (groundColor == 'pink'){
    tint(pinkColorValue);
  } else {
    tint(255);
  }
  
  //Adds ground color if redOn is true
  if (redOn == true){
    image(blueMaskVar, 0, 0, size, size);
  }

  //Yellow Ground - adds a layer of yellow/saturation to the ground color. 'aaaa' double recessive = +40% yellow
  if (redOn == true){
    if (yellowGroundGenes == 'aaaa'){
      makeTint(color(255, 228, 116), 0.8, OVERLAY, blueMaskVar);
    } else if ((yellowGroundGenes[0] == 'a' && yellowGroundGenes[1] == 'a') || (yellowGroundGenes[2] == 'a' && yellowGroundGenes[3] == 'a')){
      makeTint(color(255, 228, 116), 0.2, OVERLAY, blueMaskVar);
    }
  }

  //Desat Ground - adds a layer of grey, effectively desaturating the ground color.
  if (redOn == true && (groundColor == 'red' || groundColor == 'pink') && (desatGroundGenes[0] == 'A' || desatGroundGenes[1] == 'A')){
    makeTint(color(100), 0.5, NORMAL, blueMaskVar);
  }
  print(desatGroundGenes)

  //Red Patches - controls whether patches are possible. 'A' dominant = patches
  var redPatches = false;
  if (redPatchGenes[0] == 'A' || redPatchGenes[1] == 'A'){
    redPatches = true;
  }

  //Red Patch Amount - controls amount of ref patches. 'a' recessive = + amount of patches (max 3)
  var redPatchAmount = 0;
  for (i = 0; i < redPatchAmountGenes.length; i+=2 ){
    if (redPatchAmountGenes[i] == 'a' && redPatchAmountGenes[i + 1] == 'a'){
      redPatchAmount += 1;
    }
  }
  
  tint(redColorValue);

  if (redOn == true){
    if (redPatches == true && redPatchAmount == 1){
      makeNoise(0.01, 0.8, blueMaskVar);
    } else if (redPatches == true && redPatchAmount == 2) {
      makeNoise(0.01, 1, blueMaskVar);
    } else if (redPatches == true && redPatchAmount == 3) {
      makeNoise(0.01, 1.4, blueMaskVar);
    }

  //Yellow Over Patches - controls a layer of translucent yellow patches. 'aaaa' double recessive = patches present
    if (yellowPatchGenes == 'aaaa'){
      tintNoise(0.01, 1, blueMaskVar, color(225, 228, 116), 0.4, HARD_LIGHT);
    }
  }

  //EUMELANIN

  var blackColor = color(18);

  //Brown - controls change of back to brown. 'a' recessive = black to brown
  if (brownGenes[0] == 'a' && brownGenes[1] == 'a'){
    if (opalescentOn){
      blackColor = color(128, 43, 0);
    } else {
      blackColor = color(87, 45, 19);
    }
  }

  //Liver (overrides brown) - controls change of black or brown to liver. 'a' recessive = black/brown to liver
  if (liverGenes[0] == 'a' && liverGenes[1] == 'a'){
    if (opalescentOn){
      blackColor = color(240, 58, 12);
    } else {
      blackColor = color(173, 56, 43);
    }
  }

  //Bird Dilute (Eumelanin) - controls alpha of eumelanin. 'cg' or 'gc' codominant = 87 alpha. 'c' mid = 75 alpha. 'g' recessive = 50 alpha.
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

  //Extension - controls mask, whether eumelanin will express. 'M' mid = mask. 'r' recessive = no eumelanin
  if ((extensionGenes[0] == 'M' || extensionGenes[1] == 'M') && (agoutiGenes[0] != 'Y' && agoutiGenes[1] != 'Y')){
    distort(extension, 100, 0.003, exmask, NORMAL, blackColor);
  } else if (extensionGenes[0] == 'r' && extensionGenes[1] == 'r'){
    blackAlpha = 0;
  }

  blackColor.setAlpha(blackAlpha);

  //Dominant black - controls a top layer of eumelanin. 'K' dominant = layer present.
  if (domBlackGenes[0] == 'A' || domBlackGenes[1] == 'A'){
    tint(blackColor);
    image(ground, 0, 0, size, size);
  }

  //Black patches - controls whether black patches exist or not. 'A' dominant = patches present
  var blackPatches = false;
  if (blackPatchGenes[0] == 'A' || blackPatchGenes[1] == 'A'){
    blackPatches = true;
  }

  
  //Black parches amount - controls amount of black patches. 'a' recessive = amount +1 (max 2)
  var blackPatchAmount = 0;
  for (i = 0; i < blackPatchAmountGenes.length; i+=2 ){
    if (blackPatchAmountGenes[i] == 'a' && blackPatchAmountGenes[i + 1] == 'a'){
      blackPatchAmount += 1;
    }
  }

  tint(blackColor);
  if (blackPatches == true && blackPatchAmount == 1){
    makeNoise(0.01, 0.8, ground);
  } else if (blackPatches == true && blackPatchAmount == 2) {
    makeNoise(0.01, 1, ground);
  }

  //Agouti - controls most eumealin patterns. 'Y' dominant = black tips. 'W' mid 1 = agouti. 't' mid 2 = tan tips. 
  if (agoutiGenes[0] == 'Y' || agoutiGenes[1] == 'Y'){
    distort(tips, 200, 0.002, tipsmask, NORMAL, blackColor);
  } else if (agoutiGenes[0] == 'W' || agoutiGenes[1] == 'W'){
    distort(agouti, 200, 0.002, maneless, NORMAL, blackColor);
    tint(blackColor);
    image(headstripe, 0, 0, size, size);
  } else if (agoutiGenes[0] == 't' || agoutiGenes[1] == 't'){
    distort(reversetips, 200, 0.002, reversetipsmask, NORMAL, blackColor);
  }

  // ULTRASTRUCTURE

  var blueTint = 'skyblue';
  var blueColor = color(77, 210, 255);
  if (opalescentOn){
    blueColor = color(10, 238, 255);
  }

  //Grey - controls if ultrastructure is blue or grey. 'a' recessive = grey
  if (greyGenes[0] == 'a' && greyGenes[1] == 'a'){
    if (opalescentOn){
      blueColor = color(149, 156, 167);
    } else {
      blueColor = color(177);
    }
    blueTint = 'grey';
  }

  //Violet - controls violet tint. 'AA' dominant = bright violet. 'Aa' or 'aA' codoninant = violet-tinted.
  if (violetGenes[0] == 'a' && violetGenes[1] == 'a'){
    if (opalescentOn){
      blueColor = color(159, 170, 255);
    } else {
      blueColor = color(189, 189, 255);
    }
  } else if (violetGenes[0] == 'a' || violetGenes[1] == 'a'){
    if (blueTint = 'skyblue'){
      if (opalescentOn){
        blueColor = color(93, 158, 255);
      } else {
        blueColor = color(144, 144, 255);
      }
    } else {
      if (opalescentOn){
        blueColor = color(131, 142, 224);
      } else {
        blueColor = color(162, 162, 193);
      }
    }
  }

  //Clear - controls whether ultrastructure expresses. 'a' recessive = no ultrastructure
  var blueOn = true;
  if (clearGenes[0] == 'a' && clearGenes[1] == 'a'){
    blueOn = false;
  }

  //Bird dilute - controls ultrastructure alpha. 'cg' or 'gc' codominant = 40 alpha. 'c' mid 1 = 90 alpha. 'g' mid 2 = 50 alpha. 's' recssive = 10 alpha
  var blueAlpha = 0.5;
  if (birdDiluteGenes[0] == 'S' || birdDiluteGenes[1] == 'S'){
    //nothing happens
  } else if ((birdDiluteGenes[0] == 'c' && birdDiluteGenes[1] == 'g') || (birdDiluteGenes[0] == 'g' && birdDiluteGenes[1] == 'c')){
    blueAlpha *= 0.4; 
  } else if (birdDiluteGenes[0] == 'c' || birdDiluteGenes[1] == 'c'){
    blueAlpha *= 0.9;
  } else if (birdDiluteGenes[0] == 'g' || birdDiluteGenes[1] == 'g'){
    blueAlpha *= 0.5;
  } else {
    blueAlpha = 0.1;
  }

  //Base blue here
  if (blueOn){
    makeTint(blueColor, blueAlpha, HARD_LIGHT, ground);
  }

  //Dark - controls a layer of dark tint. 'AA' dominant = 25% darker. 'Aa' or 'aA' codominant = 12% darker. 
  var realBlack = color(0);
  if (darkGenes[0] == 'A' && darkGenes[1] == 'A'){
    makeTint(realBlack, 0.25, MULTIPLY, ground);
  } else if (darkGenes[0] == 'A' || darkGenes[1] == 'A'){
    makeTint(realBlack, 0.12, MULTIPLY, ground);
  }

  //Anthracite - controls a second layer of dark tint. 'AA' dominant = 75% darker. 'Aa' or 'aA' = 37% darker. 
  if (anthraciteGenes[0] == 'A' && anthraciteGenes[1] == 'A'){
    makeTint(realBlack, 0.75, MULTIPLY, ground);
  } else if (anthraciteGenes[0] == 'A' || anthraciteGenes[1] == 'A'){
    makeTint(realBlack, 0.37, MULTIPLY, ground);
  }
  
  //WHITE
  tint(255);

  //Tobiano - controls large patches of white
  var tobianoOn = false;

  if (tobianoGenes[0] == 'a' && tobianoGenes[1] == 'a'){
    tobianoOn = true;
  }

  //TobianoTweak - controls spread of tobiano. 'A' dominant = +1 tobiano patches (max 2)
  var tobianoAmount = 0;
  for (i = 0; i < tobianoTweakGenes.length; i+=2 ){
    if (tobianoTweakGenes[i] == 'A' || tobianoTweakGenes[i + 1] == 'A'){
      tobianoAmount += 1;
    }
  }

  if (tobianoAmount == 0 && tobianoOn == true){
    makeNoise(0.008, 0.8, ground);
  } else if (tobianoAmount == 1 && tobianoOn == true){
    makeNoise(0.008, 1, ground);
  } else if (tobianoOn == true) {
    makeNoise(0.008, 1.2, ground);
  }
  
  
  //Overo - controls small patches of white. 'a' recessive = patches present
  var overoOn = false;

  //OveroTweak - controls spread of overo. 'a' recessive = +1 overo patches (max 2)
  var overoAmount = 0;
  var overoScale = 0.02;
  for (i = 0; i < overoTweakGenes.length; i+=2 ){
    if (overoTweakGenes[i] == 'a' && overoTweakGenes[i + 1] == 'a'){
      overoAmount += 1;
    }
  }

  if (overoGenes[0] == 'a' && overoGenes[1] == 'a'){
    overoOn = true;
  }

  if (overoAmount == 0 && overoOn == true){
    makeNoise(overoScale, 0.7, ground);
  } else if (overoAmount == 1 && overoOn == true){
    makeNoise(overoScale, 1, ground);
  } else if (overoOn == true){
    makeNoise(overoScale, 1.4, ground);
  }
  
  //Dilute - controls layer of lightness. 'a' recessive = colors lightened by 70%
  if (diluteGenes[0] == 'a' && diluteGenes[1] == 'a'){
    makeTint(color(255), 0.7, SCREEN, ground);
  }

  //Face White - controls presence and amount of face white. 'a' recessive adds +1 face white.
  var whiteFaceAmount = 0;
  for (i = 0; i < whiteFaceGenes.length; i+=2 ){
    if (whiteFaceGenes[i] == 'a' && whiteFaceGenes[i + 1] == 'a'){
      whiteFaceAmount += 1;
    }
  }

  if (whiteFaceAmount == 1){
    distort(star, 25, 0.01, starmask, NORMAL, color(255));
  } else if (whiteFaceAmount == 2){
    distort(stripe, 25, 0.01, stripemask, NORMAL, color(255));
  } else if (whiteFaceAmount == 3){
    distort(blaze, 25, 0.01, blazemask, NORMAL, color(255));
  } else if (whiteFaceAmount == 4){
    distort(bald, 50, 0.01, baldmask, NORMAL, color(255));
  }
  
  //Socks - x, width, midpoint, minrandom, maxrandom, mask; tint to set color
  tint(255);
  
  //Sock Height - controls height of all socks (roughly). 'a' = +1 sock height
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
  //console.log(sockHeightNum)

  //Front left - 15 smallest, 200 largest. Controls presence of front left sock. 'aaaa' double recessive = sock present
  if (frontLeftSockGenes == 'aaaa'){
  	makeSock(100, 135, 40, sockHeightMin, sockHeightMax, frontleft);
  }

  //Back left - 30 smallest, 270 largest. Controls presence of back left sock. 'aaaa' double recessive = sock present
  if (backLeftSockGenes == 'aaaa'){
    if (sockHeightNum == 2){
      makeSock(320, 130, 87, sockHeightMin + 30, sockHeightMax + 50, backleft);
    } else if (sockHeightNum == 1) {
      makeSock(320, 130, 87, sockHeightMin, sockHeightMax + 40, backleft);
    } else {
      makeSock(320, 130, 87, sockHeightMin, sockHeightMax, backleft);
    }
  }

  //Front right - 40 smallest, 220 largest. Controls presence of front right sock. 'aaaa' double recessive = sock present
  if (frontRightSockGenes == 'aaaa'){
    if (sockHeightNum == 0){
      makeSock(100, 85, 40, sockHeightMin + 40, sockHeightMax, back);
    } else {
      makeSock(100, 85, 40, sockHeightMin, sockHeightMax, back);
    }
  }

  //Back right - 75 smallest, 270 largest. Controls presence of back left sock. 'aaaa' double recessive = sock present
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
  
  tint(255);
  image(mane, 0, 0, size, size);
  
  //Mane Red
  
  if (groundColor == 'red'){
    tint(redColorValue);
  } else if (groundColor == 'pink'){
    tint(pinkColorValue);
  } else if (redPatches == true){
    tint(redColorValue);
  }
  if (redOn == true){
  	image(mane, 0, 0, size, size);
  }
  
  //Mane black
  
  //Mane Light Grey - controls lighter layer of dark tint. 'A' dominant = + 40% darkness
  if (maneLightGreyGenes[0] == 'A' || maneLightGreyGenes[1] == 'A'){
	  makeTint(color(0), 0.4, MULTIPLY, mane);
  }
  
  //ManeDarkGrey - controls darker layer of dark tint. 'A' = mane darker by 70, or if mane is already light grey, to black
  if ((maneDarkGreyGenes[0] == 'A' || maneDarkGreyGenes[1] == 'A') && maneLightGreyGenes == 'aa'){
	  makeTint(color(0), 0.7, MULTIPLY, mane);
  } else if (maneDarkGreyGenes[0] == 'A' || maneDarkGreyGenes[1] == 'A'){
	  tint(0)
	  image(mane, 0, 0, size, size);
  }
  
  if (agoutiGenes[0] == 'W' || agoutiGenes[1] == 'W'){
	  tint(0)
	  image(mane, 0, 0, size, size);
  }
  
  //Mane Dominant White
  
  if (sockHeightNum >= 1 && (frontLeftSockGenes == 'aaaa' || backLeftSockGenes == 'aaaa' || frontRightSockGenes == 'aaaa' || backRightSockGenes == 'aaaa')){
	  tint(255)
	  image(mane, 0, 0, size, size);
  }

  //Eye Color - tint to set color

  //Eye Base Color
	var eyeBase = color(255, 250, 205);
  
  //blueGenes  = 'bb';
  //extensionGenes = 'rr';
	if (blueGenes == 'bb' && extensionGenes == 'rr'){
		eyeBase = color(128, 0, 0);
  }
  
  //Cartenoids
  
  tint(eyeBase);
  image(eye, 0, 0, size, size);

  //OrangeTint - controls layers of blood-orange tint. recessive 'a' = + 20% orange-ness.
  var orangeTintAmount = 0;
  for (i = 0; i < orangeTintGenes.length; i+=2 ){
    if (orangeTintGenes[i] == 'a' && orangeTintGenes[i + 1] == 'a'){
      orangeTintAmount += 1;
    }
  }

  //Yellow - controls layers of bright yellow. domaninant 'A' = + 20% yellow-ness
  if (eyeYellowGenes[0] == 'A' || eyeYellowGenes[1] == 'A'){
    makeTint(color(255, 255, 0), 0.2, NORMAL, eye);
  }

  for (i = 0; i < orangeTintAmount; i++){
    makeTint(color(255, 102, 0), 0.2, NORMAL, eye);
  }

  //Structure Color

  //TealTint - controls layer of teal tint. recessive 'a' = +40% teal-ness
  var tealTintAmount = 0;
  for (i = 0; i < tealTintGenes.length; i+=2 ){
    if (tealTintGenes[i] == 'a' && tealTintGenes[i + 1] == 'a'){
      tealTintAmount += 1;
    }
  }

  for (i = 0; i < tealTintAmount; i++){
    makeTint(color(130, 208, 140), 0.4, MULTIPLY, eye);
  }

  //Blue - actually makes eyes lighter. recessive 'a' = +20 layer of white
  if (eyeBlueGenes == 'aa'){ 
    makeTint(color(0, 210, 255), 0.2, HARD_LIGHT, eye);
  }

  //Lines
  image(lines, 0, 0, size, size);

  console.log('done');
}