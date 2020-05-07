function setup() {
  // put setup code here
  size = 800;
	createCanvas(size, size);
	background(0, 153, 255);
	mask = loadImage("images/Khundii_BasePaint_White.png");
	//mane = loadImage("KhundiiMane.png");
	//lines = loadImage("KhundiiLines.png")
}

function draw() {
  // put drawing code here
  //ellipse(50, 50, 80, 80);
  image(mask, 0, 0, size, size);
  tint(204, 229, 255);
}