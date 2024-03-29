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
	bodystripemask = loadImage('images/Khundii_BodyStripeMask.png'); //***
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
    //console.log(this.value());
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
  
  function makeNoise(noiseScale, coeff, mask, seed){
    // Coeff 0.8 makes small blotches; 1.8 makes huge patches
    let time = new Date;

    if (seed == 'null'){
        time = time.getMilliseconds();
        print(time);
    } else {
        time = seed;
        print(time);
    }
    
  
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
  

  function tintNoise(noiseScale, coeff, mask, seed, colorValue, alphaVal, mode){
    let time = new Date;

    if (seed == 'null'){
        time = time.getMilliseconds();
    } else {
        time = seed;
    }

    time += 3;
    print(time);
  
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
  
  

function stripeGen2(minIncrement, maxIncrement, minStripeLength, maxStripeLength, colorVal){
  let amplitude=1;
  let theta = 0;
  let increment = random(minIncrement, maxIncrement); //random(0.07,0.3)
  let stripeLength = random(minStripeLength, maxStripeLength);//random(280, 350);
  console.log(increment,stripeLength);
  
  let img = createImage(width, height);
  img.loadPixels();
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
    
    pixColor = colorVal;
    
    theta += increment/width;
      let lineVal = (sin(theta)*amplitude);
    
    var ySet = (height-stripeLength)+(-i*0.15)-(lineVal*100)
    if (j<245 || j>ySet){
      pixColor = color(0,0,0,0);
    }
    
    
      img.set(i, j, pixColor);
    }
  }
img.updatePixels();
img.mask(bodystripemask);
image(img, 0, 0);
}
  

  function createPet(petValue){
    //tint(255);
    image(ground, 0, 0, size, size);
    let seed = 7;
    let noiseSeedVal = 52;

    if (petValue == 'random'){
        //
      } else {
        seed = inputBox.value();
      }
    //tint(0);

    //noise seed scratch
    noiseSeed(noiseSeedVal);
    noiseNoise = random(-7, 0)/10;
    seed -= noiseNoise;

    //tint(255,255,255);
    //tintnoise scratch
    //makeTint(color(255, 228, 116), 1, NORMAL, ground);
	
	//tintpatches uses one like below
	//tintNoise(0.01, 1, ground, seed, color(0), 0.7, NORMAL);
	//tintNoise(0.01, 1, ground, seed+7, color(0), 0.7, NORMAL);

    //makeTint(color(100), 0.5, NORMAL, ground);
	
	//stripetests
	stripeGen2(0.2,0.2,280,350,color(0));

    image(lines, 0, 0, size, size);
	console.log('done');
  }

  //seed should increment by 0.2 minimum, 1 maximum, for optimum similarity/difference ratio
  //seed should also have per-individual randomness - range of +- 0.7
  //every starter, and every random pattern, should have a different noiseSeed
  //