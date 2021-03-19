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
  whitetips = loadImage('images/Khundii_WhiteTips.png');
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
  createElement('br');
  momBox = createInput('Mom Box');
  dadBox = createInput('Dad Box');
  inputBox.size(600);
  inputBox.input(myInputEvent);
  randomButton = createButton('random pet');
  randomButton.mousePressed(randompress);
  codeButton = createButton('code pet');
  codeButton.mousePressed(codepress);
  breedButton = createButton('breed');
  breedButton.mousePressed(breedpress)
  
  //mutation buttons here
  createElement('br');
  mutButton = createButton('mut 1');
  mutButton.mousePressed(mutpress);
  
  textBox = createElement('p');
  createElement('br');
  image(lines, 0, 0, size, size);
}

function randompress() {
  createPet('random');
}

function codepress() {
  createPet('code');
}

function breedpress(){
  //***Breeding
	var genotypeA = momBox.value();
	var genotypeB = dadBox.value();
	var genotypeLength = 0;
	newGenotype = ''
	
	if(genotypeA.length > genotypeB.length){
		genotypeLength = genotypeA.length;
		genotypeGap = genotypeLength - genotypeB.length;
		for (i = 0; i <= genotypeGap; i++){
			genotypeB += 'xx';
		}
	} else {
		genotypeLength = genotypeB.length;
		genotypeGap = genotypeLength - genotypeA.length;
		for (i = 0; i <= genotypeGap; i++){
			genotypeA += 'xx';
		}
	}
	
	for(i = 0; i < genotypeLength; i+=2){
		whichA = Math.floor(Math.random() *2);
		whichB = Math.floor(Math.random() *2);
		resultA = genotypeA[whichA + i];
		resultB = genotypeB[whichB + i];
		newGenotype += resultA + resultB;
	}
	
	inputBox.value(newGenotype);
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


// ***random genes
function randGenes(){
  //Gene assignment
  var genes = '';

    var groundColorGenes = 
    genes += genesGet(['R', 'P', 'r']);

    var groundRecGenes = genesGet('a', 4);
    genes += groundRecGenes;

    var yellowGroundGenes = genesGet('a', 2);
    genes += yellowGroundGenes;

    var desatGroundGenes = genesGet('a');
    genes += desatGroundGenes;

    var redPatchGenes = genesGet('a');
    genes += redPatchGenes;

    var redPatchAmountGenes = genesGet('a', 4);
    genes += redPatchAmountGenes;

    var yellowPatchGenes = genesGet('a', 2);
    genes += yellowPatchGenes;

    var blueGenes = genesGet(['B', 'y', 'b']);
    genes += blueGenes;

    var extensionGenes = genesGet(['M', 'Y', 'r']);
    genes += extensionGenes;

    var domBlackGenes = genesGet('a');
    genes += domBlackGenes;

    var blackPatchGenes = genesGet('a');
    genes += blackPatchGenes;

    var blackPatchAmountGenes = genesGet('a', 3);
    genes += blackPatchAmountGenes;

    var brownGenes = genesGet('a');
    genes += brownGenes;

    var agoutiGenes = genesGet(['Y', 'W', 't', 'a']);
    genes += agoutiGenes;

    var liverGenes = genesGet('a');
    genes += liverGenes;

    var birdDiluteGenes = genesGet(['S', 'c', 'g', 's']);
    genes += birdDiluteGenes;

    var greyGenes = genesGet('a');
    genes += greyGenes;

    var violetGenes = genesGet('a');
    genes += violetGenes;

    var darkGenes = genesGet('a');
    genes += darkGenes;

    var anthraciteGenes = genesGet('a');
    genes += anthraciteGenes;

    var clearGenes = genesGet(['A', 't', 'a']);
    genes += clearGenes;

    var opalescentGenes = genesGet('a');
    genes += opalescentGenes;

    var tobianoGenes = genesGet('a');
    genes += tobianoGenes;

    var tobianoTweakGenes = genesGet('a', 2);
    genes += tobianoTweakGenes;

    var overoGenes = genesGet('a');
    genes += overoGenes;

    var overoTweakGenes = genesGet('a', 2);
    genes += overoTweakGenes;

    var diluteGenes = genesGet('a');
    genes += diluteGenes;

    var whiteFaceGenes = genesGet('a', 4);
    genes += whiteFaceGenes;

    var frontLeftSockGenes = genesGet('a', 2);
    genes += frontLeftSockGenes;

    var frontRightSockGenes = genesGet('a', 2);
    genes += frontRightSockGenes;

    var backLeftSockGenes = genesGet('a', 2);
    genes += backLeftSockGenes;

    var backRightSockGenes = genesGet('a', 2);
    genes += backRightSockGenes;
    
    var sockHeightGenes = genesGet('a', 2);
    genes += sockHeightGenes;
    
    var maneLightGreyGenes = genesGet('a');
    genes += maneLightGreyGenes;
    
    var maneDarkGreyGenes = genesGet('a');
    genes += maneDarkGreyGenes;
    
    var orangeTintGenes = genesGet('a', 5);
    genes += orangeTintGenes;
    
    var eyeYellowGenes = genesGet('a');
    genes += eyeYellowGenes;
    
    var tealTintGenes = genesGet('a', 4);
    genes += tealTintGenes;
    
    var eyeBlueGenes = genesGet('a');
    genes += eyeBlueGenes;

    return genes;
}

function codeGenes(genes){
  var genes = inputBox.value();

  //***read codes
  var groundColorGenes = genes.slice(0,2);
  
  var groundRecGenes = genes.slice(2,10);
  
  var yellowGroundGenes = genes.slice(10,14);
  
  var desatGroundGenes = genes.slice(14, 16);
  
  var redPatchGenes = genes.slice(16, 18);
  
  var redPatchAmountGenes = genes.slice(18, 26);
  
  var yellowPatchGenes = genes.slice(26,30);
  
  var blueGenes = genes.slice(30, 32);
  
  var extensionGenes = genes.slice(32, 34);
  
  var domBlackGenes = genes.slice(34, 36);
  
  var blackPatchGenes = genes.slice(36, 38);
  
  var blackPatchAmountGenes = genes.slice(38, 44);
  
  var brownGenes = genes.slice(44, 46);
  
  var agoutiGenes = genes.slice(46, 48);
  
  var liverGenes = genes.slice(48, 50);
  
  var birdDiluteGenes = genes.slice(50, 52);
  
  var greyGenes = genes.slice(52, 54);
  
  var violetGenes = genes.slice(54, 56);
  
  var darkGenes = genes.slice(56, 58);
  
  var anthraciteGenes = genes.slice(58, 60);
  
  var clearGenes = genes.slice(60, 62);
  
  var opalescentGenes = genes.slice(62, 64);
  
  var tobianoGenes = genes.slice(64,66);
  
  var tobianoTweakGenes = genes.slice(66, 70);
  
  var overoGenes = genes.slice(70, 72);
  
  var overoTweakGenes = genes.slice(72, 76);
  
  var diluteGenes = genes.slice(76, 78);
  
  var whiteFaceGenes = genes.slice(78, 86);
  
  var frontLeftSockGenes = genes.slice(86, 90);
  
  var frontRightSockGenes = genes.slice(90, 94);
  
  var backLeftSockGenes = genes.slice(94, 98);
  
  var backRightSockGenes = genes.slice(98, 102);
  
  var sockHeightGenes = genes.slice(102, 106);
  
  var maneLightGreyGenes = genes.slice(106, 108);
  
  var maneDarkGreyGenes = genes.slice(108, 110);
  
  var orangeTintGenes = genes.slice(110, 120);
  
  var eyeYellowGenes = genes.slice(120, 122);

  var tealTintGenes = genes.slice(122, 130);
  
  var eyeBlueGenes = genes.slice(130, 132);


  //***Analyse gene output
  Readout = genes + '<br><br>';
  Readout += 'PHAEOMELANIN<br><br>'
  
  if (groundColorGenes[0] == 'R' || groundColorGenes[1] == 'R'){
    	groundColorVal = 'Red';
  } else if (groundColorGenes[0] == 'P' || groundColorGenes[1] == 'P'){
    	groundColorVal = 'Pink';
  } else {
    	groundColorVal = 'White';
  }
  Readout += 'groundColorGenes : ' + groundColorGenes + ' - ground color ' + groundColorVal + '<br>';
  
  var groundRecNum = 0;
  	for (i = 0; i < groundRecGenes.length; i+= 2 ){
    	if (groundRecGenes[i] != 'A' && groundRecGenes[i + 1] != 'A'){
      		groundRecNum += 1;
    	}
	}
	Readout += 'groundRecGenes : ' + groundRecGenes + ' - ground intensity factor ' + groundRecNum + '<br>';
	
	var yellowGroundLayers = 0;
	if (yellowGroundGenes == 'aaaa'){
		yellowGroundLayers = 2;
  	} else if ((yellowGroundGenes[0] == 'a' && yellowGroundGenes[1] == 'a') || (yellowGroundGenes[2] == 'a' && yellowGroundGenes[3] == 'a')){
    	yellowGroundLayers = 1;
	}
	Readout += 'yellowGroundGenes : ' + yellowGroundGenes + ' - yellow layers ' + yellowGroundLayers + '<br>';
	
	var desatOn = 'Off';
	if (desatGroundGenes[0] == 'A' || desatGroundGenes[1] == 'A'){
		desatOn = 'On';
	}
	Readout += 'desatGroundGenes : ' + desatGroundGenes + ' - desaturation of ground layer ' + desatOn + '<br>';
	
	var redPatchesOnVal = 'No'
	if (redPatchGenes[0] == 'A' || redPatchGenes[1] == 'A'){
    	redPatchesOnVal = 'Yes';
	}
	Readout += 'redPatchGenes : ' + redPatchGenes + ' - red patch factor ' + redPatchesOnVal + '<br>';
	
	var redPatchAmountVal = 0;
  	for (i = 0; i < redPatchAmountGenes.length; i+=2 ){
    	if (redPatchAmountGenes[i] == 'a' && redPatchAmountGenes[i + 1] == 'a'){
      		redPatchAmountVal += 1;
    	}
	}
	Readout += 'redPatchAmountGenes : ' + redPatchAmountGenes + ' - red patch amount ' + redPatchAmountVal + '<br>';
	
	var yellowOver = 'None';
	if (yellowPatchGenes == 'aaaa'){
		yellowOver = 'Additional yellow layer';
	} else if ((yellowPatchGenes[0] == 'a') && (yellowPatchGenes[1] == 'a') || (yellowPatchGenes[2] == 'a') && (yellowPatchGenes[3] == 'a')){
		yellowOver = 'Yellow patches layer';
	}
	Readout += 'yellowPatchGenes : ' + yellowPatchGenes + ' - yellow over factor ' + yellowOver + '<br>';
	
	var blueStatus = 'Normal phaeomelanin';
	if ((blueGenes[0] == 'y' || blueGenes[1] == 'y') && (blueGenes[0] != 'B' && blueGenes[1] != 'B')){
			blueStatus = 'Phaeomelanin restricted to face and tail';
	} else if (blueGenes[0] == 'b' && blueGenes[1] == 'b'){
			blueStatus = 'No phaeomelanin';
	}
	Readout += 'blueGenes : ' + blueGenes + " - phaeomelanin restriction factor " + blueStatus + '<br>';
	
	Readout += '<br>EUMELANIN<br><br>'
	
	var extensionFactor = 'None';
	if ((extensionGenes[0] == 'M' || extensionGenes[1] == 'M') && (agoutiGenes[0] != 'Y' && agoutiGenes[1] != 'Y')){
			extensionFactor = 'Face Mask';
	} else if (extensionGenes[0] == 'r' && extensionGenes[1] == 'r'){
			extensionFactor = 'No Eumelanin';
	}
	Readout += 'extensionGenes : ' + extensionGenes + ' - extension factor ' + extensionFactor + '<br>';
	
	var domBlackOn = 'No';
	if (domBlackGenes[0] == 'A' || domBlackGenes[1] == 'A'){
		domBlackOn = 'Yes';
	}
	Readout += 'domBlackGenes : ' + domBlackGenes + " - dominant black " + domBlackOn + '<br>';
	
	var blackPatchesVal = 'No';
	if (blackPatchGenes[0] == 'A' || blackPatchGenes[1] == 'A'){
		blackPatchesVal = 'Yes';
	}
	Readout += 'blackPatchGenes : ' + blackPatchGenes + ' - black patches on ' + blackPatchesVal + '<br>';
	
	var blackPatchAmountVal = 0;
	for (i = 0; i < blackPatchAmountGenes.length; i+=2 ){
    	if (blackPatchAmountGenes[i] == 'a' && blackPatchAmountGenes[i + 1] == 'a'){
      	blackPatchAmountVal += 1;
    	}
	}
	Readout += 'blackPatchAmountGenes : ' + blackPatchAmountGenes + ' - black patch amount ' + blackPatchAmountVal + '<br>';
	
	var brownOn = 'No';
	if (brownGenes[0] == 'a' && brownGenes[1] == 'a'){
		brownOn = 'Yes';
	}
	Readout += 'brownGenes : ' + brownGenes + ' - brown factor ' + brownOn + '<br>';
	
	var agoutiPattern = 'None';
	if (agoutiGenes[0] == 'Y' || agoutiGenes[1] == 'Y'){
    	agoutiPattern = 'Black tips';
	} else if (agoutiGenes[0] == 'W' || agoutiGenes[1] == 'W'){
	    agoutiPattern = 'Agouti';
	} else if (agoutiGenes[0] == 't' || agoutiGenes[1] == 't'){
    	agoutiPattern = 'Tan tips';
	}
	Readout += 'agoutiGenes : ' + agoutiGenes + " - agouti pattern " + agoutiPattern + '<br>';
	
	var liverOn = 'No';
	if (liverGenes[0] == 'a' && liverGenes[1] == 'a'){
		liverOn = 'Yes';
	}
	Readout += 'liverGenes : ' + liverGenes + ' - liver factor ' + liverOn + '<br>';
	
	Readout += '<br>ULTRASTRUCTURE<br><br>'
	
	var birdDilution = 'None';
	if (birdDiluteGenes[0] == 'S' || birdDiluteGenes[1] == 'S'){
    //nothing happens
  	} else if ((birdDiluteGenes[0] == 'c' && birdDiluteGenes[1] == 'g') || (birdDiluteGenes[0] == 'g' && birdDiluteGenes[1] == 'c')){
    	birdDilution = 'Eumelanin minus 87%, ultrastructure to 40%'; 
  	} else if (birdDiluteGenes[0] == 'c' || birdDiluteGenes[1] == 'c'){
    	birdDilution = 'Eumelanin minus 75%, ultrastructure to 90%';
  	} else if (birdDiluteGenes[0] == 'g' || birdDiluteGenes[1] == 'g'){
    	birdDilution = 'Eumelanin minus 50%, ultrastructure to 50%';
  	} else {
    	birdDilution = 'Eumelanin minus 50%, ultrastructure to 10%';
	}
	Readout += 'birdDiluteGenes : ' + birdDiluteGenes + ' - bird dilution ' + birdDilution + '<br>';
	
	var greyOn = 'No';
	if (greyGenes[0] == 'a' && greyGenes[1] == 'a'){
		greyOn = 'Yes'
	}
	Readout += 'greyGenes : ' + greyGenes + ' - grey factor ' + greyOn + '<br>';
	
	var violetAmount = 'None';
	if (violetGenes[0] == 'a' && violetGenes[1] == 'a'){
		//nothing happens
	} else if (violetGenes[0] == 'a' || violetGenes[1] == 'a'){
		violetAmount = 'Violet tint';
	} else {
		violetAmount = 'Bright violet';
	}
	Readout += 'violetGenes : ' + violetGenes + ' - violet ' + violetAmount + '<br>';
	
	var darkAmount = 'None';
	if (darkGenes[0] == 'A' && darkGenes[1] == 'A'){
		darkAmount = '25% darker';
	} else if (darkGenes[0] == 'A' || darkGenes[1] == 'A'){
		darkAmount = '12% darker';
	}
	Readout += 'darkGenes : ' + darkGenes + ' - dark amount ' + darkAmount + '<br>';
	
	var anthraciteAmount = 'None';
	if (anthraciteGenes[0] == 'A' && anthraciteGenes[1] == 'A'){
		anthraciteAmount = '75% darker';
	} else if (anthraciteGenes[0] == 'A' || anthraciteGenes[1] == 'A'){
		anthraciteAmount = '37% darker';
	}
	Readout += 'anthraciteGenes : ' + anthraciteGenes + ' - anthracite amount ' + anthraciteAmount + '<br>';
	
	var clearVal = 'Active';
	if (clearGenes[0] == 'a' && clearGenes[1] == 'a'){
		clearVal = 'Inactive';
	} else if (clearGenes[0] == 't' && clearGenes[1] == 't'){
		clearVal = 'Restricted to face and tail';
	}
	Readout += 'clearGenes : ' + clearGenes + ' - ultrastructure ' + clearVal + '<br>';
	
	var opalescentFactor = 'No'
	if (opalescentGenes[0] == 'a' && opalescentGenes[1] == 'a'){
    	var opalescentFactor = 'Yes';
	}
	Readout += 'opalescentGenes : ' + opalescentGenes + " - opalescent factor " + opalescentFactor + '<br>';
	
	Readout += '<br>WHITE<br><br>'
	
	var tobianoVal = 'No';
	if (tobianoGenes[0] == 'a' && tobianoGenes[1] == 'a'){
    	tobianoVal = 'Yes';
	}
	Readout += 'tobianoGenes : ' + tobianoGenes + ' - tobiano on ' + tobianoVal + '<br>';
	
	var tobianoAmountNum = 0;
  	for (i = 0; i < tobianoTweakGenes.length; i+=2 ){
    	if (tobianoTweakGenes[i] == 'A' || tobianoTweakGenes[i + 1] == 'A'){
      	tobianoAmountNum += 1;
    	}
	}
	Readout += 'tobianoTweakGenes : ' + tobianoTweakGenes + ' - tobiano amount ' + tobianoAmountNum + '<br>';
	
	var overoVal = 'No';
	if (overoGenes[0] == 'a' && overoGenes[1] == 'a'){
    	overoVal = 'Yes';
	}
	Readout += 'overoGenes : ' + overoGenes + ' - overo on ' + overoVal + '<br>';
	
	var overoAmountNum = 0;
	for (i = 0; i < overoTweakGenes.length; i+=2 ){
    	if (overoTweakGenes[i] == 'a' && overoTweakGenes[i + 1] == 'a'){
    		overoAmountNum += 1;
    	}
	}
	Readout += 'overoTweakGenes : ' + overoTweakGenes + ' - overo amount ' + overoAmountNum + '<br>';
	
	diluteOn = 'No';
	if (diluteGenes[0] == 'a' && diluteGenes[1] == 'a'){
		diluteOn = 'Yes';
	}
	Readout += 'diluteGenes : ' + diluteGenes + ' - dilution on ' + diluteOn + '<br>';
	
	var faceWhite = 'None';
	var whiteFaceAmountVal = 0;
  	for (i = 0; i < whiteFaceGenes.length; i+=2 ){
    	if (whiteFaceGenes[i] == 'a' && whiteFaceGenes[i + 1] == 'a'){
      		whiteFaceAmountVal += 1;
    	}
	}
	if (whiteFaceAmountVal == 1){
    	faceWhite = 'Star';
	} else if (whiteFaceAmountVal == 2){
		faceWhite = 'Stripe';
	} else if (whiteFaceAmountVal == 3){
    	faceWhite = 'Blaze';
	} else if (whiteFaceAmountVal == 4){
    	faceShite = 'Mask';
	}
	Readout += 'whiteFaceGenes : ' + whiteFaceGenes + ' - face white ' + faceWhite + '<br>';
	
	var frontLeftSockVal = 'No';
	if (frontLeftSockGenes == 'aaaa'){
		frontLeftSockVal = 'Yes';
	}
	Readout += 'frontLeftSockGenes : ' + frontLeftSockGenes + ' - front left sock ' + frontLeftSockVal + '<br>';
	
	var frontRightSockVal = 'No';
	if (frontRightSockGenes == 'aaaa'){
		frontRightSockVal = 'Yes';
	}
	Readout += 'frontRightSockGenes : ' + frontRightSockGenes + ' - front right sock ' + frontRightSockVal + '<br>';
	
	var backLeftSockVal = 'No';
	if (backLeftSockGenes == 'aaaa'){
		backLeftSockVal = 'Yes';
	}
	Readout += 'backLeftSockGenes : ' + backLeftSockGenes + ' - back left sock ' + backLeftSockVal + '<br>';
	
	var sockHeight = 'Low';
	var sockHeightVal = 0;
	for (i = 0; i < sockHeightGenes.length; i++){
    	if (sockHeightGenes[i] == 'a'){
      		sockHeightVal += 1;
    	}
	}
	if (sockHeightVal == 1){
		sockHeight = 'Medium';
	} else if (sockHeightVal == 2){
		sockHeight = 'High';
	}
	Readout += 'sockHeightGenes : ' + sockHeightGenes + ' - sock height ' + sockHeight + '<br>';
	
	Readout += '<br>MANE<br><br>';
	
	var maneLightGrey = "No";
	if (maneLightGreyGenes[0] == 'A' || maneLightGreyGenes[1] == 'A'){
		maneLightGrey = 'Yes';
	}
	Readout += 'maneLightGreyGenes : ' + maneLightGreyGenes + ' - light grey layer ' + maneLightGrey + '<br>';
	
	var maneDarkGrey = 'No';
	if (maneDarkGreyGenes[0] == 'A' || maneDarkGreyGenes[1] == 'A'){
		maneDarkGrey = 'Yes';
	}
	Readout += 'maneDarkGreyGenes : ' + maneDarkGreyGenes + ' - dark grey layer ' + maneDarkGrey + '<br>';
	
	var maneDominantWhite = 'No';
	if (sockHeightVal >= 1 && (frontLeftSockGenes == 'aaaa' || backLeftSockGenes == 'aaaa' || frontRightSockGenes == 'aaaa' || backRightSockGenes == 'aaaa')){
		maneDonimantWhite = 'Yes';
	}
	Readout += 'mane dominant white ' + maneDominantWhite + '<br>';
	
	Readout += '<br>EYES<br><br>';
	
	var orangeTintVal = 0;
    for (i = 0; i < orangeTintGenes.length; i+=2 ){
      if (orangeTintGenes[i] == 'a' && orangeTintGenes[i + 1] == 'a'){
        	orangeTintVal += 1;
      }
	}
	Readout += 'eyeOrangeTintGenes : ' + orangeTintGenes + ' - eye orange tint amount ' + orangeTintVal + '<br>';
	
	var eyesYellowOn = 'No';
	if (eyeYellowGenes[0] == 'A' || eyeYellowGenes[1] == 'A'){
		eyesYellowOn = 'Yes';
	}
	Readout += 'eyeYellowGenes : ' + eyeYellowGenes + ' - eye yellow on ' + eyesYellowOn + '<br>';
	
	 var tealTintVal = 0;
	for (i = 0; i < tealTintGenes.length; i+=2 ){
 		if (tealTintGenes[i] == 'a' && tealTintGenes[i + 1] == 'a'){
			tealTintVal += 1;
		}
	}
	Readout += 'eyeTealTintGenes : ' + tealTintGenes + ' - eye teal tint amount ' + tealTintVal + '<br>';
	
	var lightEyes = 'No';
	if (eyeBlueGenes == 'aa'){
		lightEyes = 'Yes';
	}
	Readout += 'eyeBlueGenes : ' + eyeBlueGenes + ' - eyes blue/lighten on ' + lightEyes + '<br>';
	
	Readout += '<br>MUTATIONS<br><br>';
	
	var extraGenesDisplay = genes.slice(132, genes.length);
	Readout += 'extraGenes: ' + extraGenesDisplay;

  return Readout;
}

function mutpress(){
	distort(whitetips, 100, 0.002, tipsmask, NORMAL, color(255));
  tint(0);
  image(lines, 0, 0, size, size);
  var genes = inputBox.value();
  if(genes.slice(132, 134) == ''){
    genes += 'nn';
  }
  var Readout = codeGenes(genes);
  print('all genes : ' + genes);
  textBox.html(Readout);
}

function createPet(petValue){
  clear();
  background(204, 229, 255);
  var genes = '';
  if (petValue == 'random'){
    genes = randGenes();
  } else {
    var genes = inputBox.value();
  }

  //***read codes second time
  var groundColorGenes = genes.slice(0,2);
  
  var groundRecGenes = genes.slice(2,10);
  
  var yellowGroundGenes = genes.slice(10,14);
  
  var desatGroundGenes = genes.slice(14, 16);
  
  var redPatchGenes = genes.slice(16, 18);
  
  var redPatchAmountGenes = genes.slice(18, 26);
  
  var yellowPatchGenes = genes.slice(26,30);
  
  var blueGenes = genes.slice(30, 32);
  
  var extensionGenes = genes.slice(32, 34);
  
  var domBlackGenes = genes.slice(34, 36);
  
  var blackPatchGenes = genes.slice(36, 38);
  
  var blackPatchAmountGenes = genes.slice(38, 44);
  
  var brownGenes = genes.slice(44, 46);
  
  var agoutiGenes = genes.slice(46, 48);
  
  var liverGenes = genes.slice(48, 50);
  
  var birdDiluteGenes = genes.slice(50, 52);
  
  var greyGenes = genes.slice(52, 54);
  
  var violetGenes = genes.slice(54, 56);
  
  var darkGenes = genes.slice(56, 58);
  
  var anthraciteGenes = genes.slice(58, 60);
  
  var clearGenes = genes.slice(60, 62);
  
  var opalescentGenes = genes.slice(62, 64);
  
  var tobianoGenes = genes.slice(64,66);
  
  var tobianoTweakGenes = genes.slice(66, 70);
  
  var overoGenes = genes.slice(70, 72);
  
  var overoTweakGenes = genes.slice(72, 76);
  
  var diluteGenes = genes.slice(76, 78);
  
  var whiteFaceGenes = genes.slice(78, 86);
  
  var frontLeftSockGenes = genes.slice(86, 90);
  
  var frontRightSockGenes = genes.slice(90, 94);
  
  var backLeftSockGenes = genes.slice(94, 98);
  
  var backRightSockGenes = genes.slice(98, 102);
  
  var sockHeightGenes = genes.slice(102, 106);
  
  var maneLightGreyGenes = genes.slice(106, 108);
  
  var maneDarkGreyGenes = genes.slice(108, 110);
  
  var orangeTintGenes = genes.slice(110, 120);
  
  var eyeYellowGenes = genes.slice(120, 122);

  var tealTintGenes = genes.slice(122, 130);
  
  var eyeBlueGenes = genes.slice(130, 132);

  var whiteTipGenes = genes.slice(132, 134);
  if (whiteTipGenes == ''){
    whiteTipGenes == 'xx';
  }
  
  inputBox.value(genes);
  var Readout = codeGenes(genes);
  
  print('all genes : ' + genes);
  textBox.html(Readout);

  //***Genes to output

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

  //Desat Ground - adds a layer of grey, effectively desaturating the ground color. 'A' dominant = + 50% greyer
  if (redOn == true && (groundColor == 'red' || groundColor == 'pink') && (desatGroundGenes[0] == 'A' || desatGroundGenes[1] == 'A')){
    makeTint(color(100), 0.5, NORMAL, blueMaskVar);
  }

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
      makeTint(color(225, 228, 116), 0.5, HARD_LIGHT, blueMaskVar);
    } else if ((yellowPatchGenes[0] == 'a') && (yellowPatchGenes[1] == 'a') || (yellowPatchGenes[2] == 'a') && (yellowPatchGenes[3] == 'a')){
      tintNoise(0.01, 1.2, blueMaskVar, color(225, 228, 116), 0.4, HARD_LIGHT);
    }
  }

  //EUMELANIN

  var blackColor = color(19);

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
  if (blueOn && (clearGenes[0] == 't' && clearGenes[1] == 't')){
    makeTint(blueColor, blueAlpha, HARD_LIGHT, blueMaskVar);
  } else if (blueOn){
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
  if (overoGenes[0] == 'a' && overoGenes[1] == 'a'){
    overoOn = true;
  }

  //OveroTweak - controls spread of overo. 'a' recessive = +1 overo patches (max 2)
  var overoAmount = 0;
  var overoScale = 0.02;
  for (i = 0; i < overoTweakGenes.length; i+=2 ){
    if (overoTweakGenes[i] == 'a' && overoTweakGenes[i + 1] == 'a'){
      overoAmount += 1;
    }
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

  //White tip mutation - x is dominant (no effect), n is recessive (white tips)
  if (whiteTipGenes == 'nn'){
    distort(whitetips, 100, 0.002, tipsmask, NORMAL, color(255));
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
	  makeTint(color(0), 1, MULTIPLY, mane);
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