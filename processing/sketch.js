function setup() {
  // put setup code here
  size = 800;
	createCanvas(size, size);
	background(204, 229, 255);
	// here we use a callback to display the image after loading
  loadImage('images/Khundii_BasePaint_White.png', img => {
    image(img, 0, 0);
   });
}

function draw() {
  // put drawing code here
  //ellipse(50, 50, 80, 80);
}