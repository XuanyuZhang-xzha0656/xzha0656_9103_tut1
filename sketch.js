let multiCircles = [];
let innerMultiCircleNum = 10; // Number of inner concentric circles
let layerNum = 5; // Number of outer layers
let dotSize = 20; // Size of the dots
let dotDensity = 50; // Density of the dots
const stepSize = 1; // Adjust to change the speed of downward movement
const rotationStepSize = 0.5; // Adjust to change the speed of rotation
const interval = 30; // Interval (in frames) between the creation of new multiCircles

class MultiCircle {
  // Constructor to initialize the properties of multiCircle
  constructor(x, y, maxRadius, innerMultiCircleNum, layerNum) {
    this.x = x;
    this.y = y;
    this.maxRadius = maxRadius;
    this.innerMultiCircleNum = innerMultiCircleNum;
    this.layerNum = layerNum;
    this.innerRadius = maxRadius / 2;
    this.dotRadius = 5;
    this.angle = random(360); // Random initial angle

    // Allowed colors for inner concentric circles
    this.innerAllowedColors = [
      color(87, 98, 100),
      color(180, 172, 153),
      color(128, 128, 98),
      color(175, 146, 116),
      color(145, 73, 63)
    ];
    // Allowed colors for outer dots
    this.outerAllowedColors = [
      color(221, 211, 143),
      color(198, 177, 107),
      color(124, 167, 195),
      color(141, 164, 189),
      color(228, 122, 77),
    ];
    // Generate random colors for inner circles and outer dots
    this.innerColors = this.generateRandomColors(innerMultiCircleNum, this.innerAllowedColors);
    this.outerColor = this.generateRandomColors(1, this.outerAllowedColors)[0];
  }

  // Generate an array of random colors from the allowed colors
  generateRandomColors(num, allowedColors = []) {
    let colors = [];
    for (let i = 0; i < num; i++) {
      if (allowedColors.length > 0) {
        colors.push(allowedColors[int(random(allowedColors.length))]);
      } else {
        colors.push(color(random(255), random(255), random(255)));
      }
    }
    return colors;
  }

  // Display the multiCircle
  display() {
    // Calculate the outermost radius
    let outerRadius = this.innerRadius + this.layerNum * this.dotRadius * 2;

    // Draw the background circle with no stroke
    fill(231, 231, 224);
    noStroke();
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    ellipse(0, 0, outerRadius * 2);

    // Draw inner concentric circles
    noFill();
    for (let i = this.innerColors.length - 1; i >= 0; i--) {
      stroke(this.innerColors[i]);
      strokeWeight(5);
      ellipse(0, 0, this.innerRadius * (i + 1) / this.innerColors.length * 2);
    }

    // Draw outer circle dots
    fill(this.outerColor);
    noStroke();
    for (let i = 0; i < 360; i += 10) {
      let angle = radians(i);
      for (let j = 0; j < this.layerNum; j++) {
        let radius = this.innerRadius + j * this.dotRadius * 2;
        let x = cos(angle) * radius;
        let y = sin(angle) * radius;
        ellipse(x, y, this.dotRadius * 2);
      }
    }
    pop();
  }

  // Update the position and angle of the multiCircle
  update() {
    this.y += stepSize; // Move downward
    this.angle += rotationStepSize; // Rotate

    // If the multiCircle moves past the bottom of the canvas, reset to the top
    if (this.y - this.innerRadius > height) {
      this.y = -this.innerRadius;
    }
  }
}

//draw DunHuang style background
//draw leaves
class Leaf {
  constructor(angle, innerRadius, outerRadius) {
    this.angle = angle;
    this.innerRadius = innerRadius;
    this.outerRadius = outerRadius;
    
  }
  
  draw() {
    push();
    translate(width / 2, height / 2);
    rotate(this.angle);
    
    // Define control points for the leaf shape
    let x1 = this.innerRadius * cos(0);
    let y1 = this.innerRadius * sin(0);
    let x2 = this.outerRadius * cos(20);
    let y2 = this.outerRadius * sin(20);
    let x3 = this.outerRadius * cos(-20);
    let y3 = this.outerRadius * sin(-20);
    let x4 = this.outerRadius * cos(0);
    let y4 = this.outerRadius * sin(0);
    
    stroke(203,128,37);
    strokeWeight(2);
    noFill();
    
    // Draw left side of the leaf
    beginShape();
    vertex(x1, y1);
    //bezierVertex((x1 + x2) / 2, (y1 + y2) / 2, (x1 + x4) / 2, (y1 + y4) / 2, x4, y4);
    bezierVertex(x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2, x1 + (x4 - x1) / 2, y1 + (y4 - y1) / 2, x4, y4);
    endShape();
    
    // Draw right side of the leaf
    beginShape();
    vertex(x1, y1);
    //bezierVertex((x1 + x3) / 2, (y1 + y3) / 2, (x1 + x4) / 2, (y1 + y4) / 2, x4, y4);
    bezierVertex(x1 + (x3 - x1) / 2, y1 + (y3 - y1) / 2, x1 + (x4 - x1) / 2, y1 + (y4 - y1) / 2, x4, y4);
    endShape();
    
    // Draw center line of the leaf
    line(x1, y1, x4, y4);
    
    pop();
  }
}
//draw DunHuang style background
class DunHuang {
  constructor(bigCircleRadius, smallCircleRadius, numLeaves) {
    this.bigCircleRadius = bigCircleRadius;
    this.smallCircleRadius = smallCircleRadius;
    this.numLeaves = numLeaves;
    this.angleIncrement = radians(22.5); 
  }

  draw() {
    //translate(width / 2, height / 2);
    
    let leafCircle = this.smallCircleRadius + 50;
    
    // Draw big circle
    stroke(203,128,37);
    strokeWeight(5);
    fill(242,236,174);
    ellipse(width/2, height/2, this.bigCircleRadius * 2, this.bigCircleRadius * 2);
    
    // Draw small circle
    noFill();
    stroke(170,123,26);
    ellipse(width/2, height/2, this.smallCircleRadius * 2, this.smallCircleRadius * 2);
    
    // Draw 16 leaves
    for (let i = 0; i < this.numLeaves; i++) {
      //let angle = i * this.angleIncrement;
      let angle = i * this.angleIncrement;
      let leaf = new Leaf(angle, leafCircle, this.bigCircleRadius);
      leaf.draw();
    }
    
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //angleMode(DEGREES);
  frameRate(60); // Set frame rate to ensure consistent timing
}

function draw() {
  background(255);
  drawPolkaDotBackground();
  let dunHuangBack = new DunHuang(350, 50, 16);
  dunHuangBack.draw();

  // Update and display all multiCircles
  for (let mc of multiCircles) {
    mc.update();
    mc.display();
  }

  // Generate a new multiCircle at intervals
  if (frameCount % interval === 0) {
    let x = random(width);
    let y = random(-200, 0); // Start above the screen
    let maxRadius = random(100, 200);
    multiCircles.push(new MultiCircle(x, y, maxRadius, innerMultiCircleNum, layerNum));
  }
}

function drawPolkaDotBackground() {
  // Draw polka dot background
  fill(193, 110, 74);
  noStroke();
  for (let y = 0; y < height; y += dotDensity) {
    for (let x = 0; x < width; x += dotDensity) {
      let size = dotSize * (1 + 0.5 * sin(TWO_PI * (frameCount * 0.008 + x / width)));
      ellipse(x, y, size);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
