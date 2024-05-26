let multiCircles = [];
let innerMultiCircleNum = 10; // Number of inner concentric circles
let layerNum = 5; // Number of outer layers
let dotSize = 10; // Size of the dots
let dotDensity = 30; // Density of the dots

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
    // Allowed colors for inner concentric circles
    this.innerAllowedColors = [
      color(38, 77, 92),
      color(201, 158, 211),
      color(121, 126, 122),
      color(213, 39, 41),
    ];
    // Allowed colors for outer dots
    this.outerAllowedColors = [
      color(227, 121, 35),
      color(77, 180, 141),
      color(51, 132, 186)
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
    fill(255);
    noStroke();
    ellipse(this.x, this.y, outerRadius * 2);

    // Draw inner concentric circles
    noFill();
    for (let i = this.innerColors.length - 1; i >= 0; i--) {
      stroke(this.innerColors[i]);
      strokeWeight(5);
      ellipse(this.x, this.y, this.innerRadius * (i + 1) / this.innerColors.length * 2);
    }

    // Draw outer circle dots
    fill(this.outerColor);
    noStroke();
    for (let i = 0; i < 360; i += 10) {
      let angle = radians(i);
      for (let j = 0; j < this.layerNum; j++) {
        let radius = this.innerRadius + j * this.dotRadius * 2;
        let x = this.x + cos(angle) * radius;
        let y = this.y + sin(angle) * radius;
        ellipse(x, y, this.dotRadius * 2);
      }
    }
  }
}

function setup() {
  createCanvas(800, 800);

  // Generate multiCircles at random positions
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let maxRadius = random(50, 200);
    multiCircles.push(new MultiCircle(x, y, maxRadius, innerMultiCircleNum, layerNum));
  }
}

function draw() {
  background(255);
  drawPolkaDotBackground();
  
  // Display all multiCircles
  for (let mc of multiCircles) {
    mc.display();
  }
}

function drawPolkaDotBackground() {
  // Draw red polka dot background
  fill(255, 74, 0);
  noStroke();
  for (let y = 0; y < height; y += dotDensity) {
    for (let x = 0; x < width; x += dotDensity) {
      ellipse(x, y, dotSize);
    }
  }
}