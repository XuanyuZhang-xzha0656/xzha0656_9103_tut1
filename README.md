# xzha0656_9103_tut1_Individual


## Artwork Description:
### outline
I used a time based animation effect.
The screen consists of three main elements: multiCircles that are randomly generated from the top and rotate down, a DunHuang style pattern in the centre of the screen and a polka dot background that creates a wave effect.

### Introduction to Elements and Animations
There are three main elements in this piece, the animated elements are the multiCircle (consisting of several concentric circles inside and dots outside) and the polka dot background, and the static element is the DunHuang style pattern in the centre of the canvas.

* **multiCircle:**
  The multiCircle is randomly generated according to a fixed set of colours. multiCircle will be randomly generated continuously from the top of the canvas and rotate down.
* **Polka dot background:**
  The polka dot background is frame-timed, and each column of polka dots will grow larger and shrink back to its original shape in order to achieve a wave-like visual effect.

## Work Inspiration:
### Group Work
The graphic for our group work was inspired by Pacita Abad's 'Wheels of fortune' and the colour scheme was inspired by the Dunhuang style, which is very characteristic of Chinese culture.

[![Pacita Abad Wheels of fortune.jpg](https://img2.imgtp.com/2024/05/30/23dRn1bE.jpg)](https://img2.imgtp.com/2024/05/30/23dRn1bE.jpg)

[![Color_set.jpg](https://img2.imgtp.com/2024/05/30/ZH6s2Soh.jpg)](https://img2.imgtp.com/2024/05/30/ZH6s2Soh.jpg)

With the combination and redesign of the two, we created the group version of the picture.

[![Group work.png](https://img2.imgtp.com/2024/05/30/b6P5Yg59.png)](https://img2.imgtp.com/2024/05/30/b6P5Yg59.png)

### Individual Work
For my individual assignment, I continued the colour scheme and key elements from my group work and added a pattern drawn from circles, curves and straight lines in the centre of the image, inspired by a Dunhuang style totem.

[![DunHuang.jpg](https://img2.imgtp.com/2024/05/30/K8kW7FzQ.jpg)](https://img2.imgtp.com/2024/05/30/K8kW7FzQ.jpg)

[![with_dunhuang.png](https://img2.imgtp.com/2024/05/30/QS7xI0yt.png)](https://img2.imgtp.com/2024/05/30/QS7xI0yt.png)

## Code Description
### Adding a rotating drop effect to multiCircle

* Use `push()` and `pop()` to save and restore the drawing state.
* Use `translate()` to move the drawing origin to the centre of the multiCircle and rotate it using `rotate()`.
* Call `update()` every frame, increasing the `y`-coordinate for downward movement and `angle` for rotation
* If the `multiCircle` moves out of the bottom of the canvas, reset its position to the top of the canvas.
  

```
    update() {
    this.y += stepSize; // Move downward
    this.angle += rotationStepSize; // Rotate

    // If the multiCircle moves past the bottom of the canvas, reset to the top
    if (this.y - this.innerRadius > height) {
      this.y = -this.innerRadius;
    }
  }
```

* In the `draw` function, the `frameCount` is checked every frame to see if the `interval` is reached, and if so, a new `MultiCircle` is generated.

```
 // Generate a new multiCircle at intervals
  if (frameCount % interval === 0) {
    let x = random(width);
    let y = random(-200, 0); // Start above the screen
    let maxRadius = random(100, 200);
    multiCircles.push(new MultiCircle(x, y, maxRadius, innerMultiCircleNum, layerNum));
  }

```
[![Tab-Sketch-v1.gif](https://img2.imgtp.com/2024/05/30/dZOTIvi9.gif)](https://img2.imgtp.com/2024/05/30/dZOTIvi9.gif)

This is the first version of the animation that only adds the rotating drop effect.

[![Tab-Sketch-v2.gif](https://img2.imgtp.com/2024/05/30/uqNSRym8.gif)](https://img2.imgtp.com/2024/05/30/uqNSRym8.gif)
This is the second version, which keeps generating new multiCircle one by one.

### Add the DunHuang style pattern
The `Leaf` class is used to draw a single leaf, which is shaped by a Bezier curve.
Initialise the angle and inner and outer radius of the leaf in the `constructor`.
In the `draw` function:
* Save and restore the drawing state using `push()` and `pop()`
* Use `translate()` to move the origin to the centre of the canvas and `rotate()` to the specified angle
* Define the control points for the shape of the leaf and draw a Bezier curve to form the leaf using the `bezierVertex()` function.
* Draw the left and right curves of the leaf using `beginShape()` and `endShape()`.
* Use `line()` to draw the centre line of the leaf.
```
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

```

```
beginShape();
    vertex(x1, y1);
    
    bezierVertex(x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2, x1 + (x4 - x1) / 2, y1 + (y4 - y1) / 2, x4, y4);
    endShape();
    
    // Draw right side of the leaf
    beginShape();
    vertex(x1, y1);
    
    bezierVertex(x1 + (x3 - x1) / 2, y1 + (y3 - y1) / 2, x1 + (x4 - x1) / 2, y1 + (y4 - y1) / 2, x4, y4);
    endShape();
    
    // Draw center line of the leaf
    line(x1, y1, x4, y4);
    
    pop();
  }
  ```
***Bezier curves related content and tutorials from [P5.js Curves](https://p5js.org/learn/curves.html)***

Initialise the radius of the big and small circles in the `DunHuang` class, set the number of leaves and the angle increment.
Draw the big circle and small circle in the `draw` function, and refer to the `draw` function in the Leaf class to draw all the leaves in a for loop.

```
 constructor(bigCircleRadius, smallCircleRadius, numLeaves) {
    this.bigCircleRadius = bigCircleRadius;
    this.smallCircleRadius = smallCircleRadius;
    this.numLeaves = numLeaves;
    this.angleIncrement = radians(22.5); 
  }
  ```
```
for (let i = 0; i < this.numLeaves; i++) {
      //let angle = i * this.angleIncrement;
      let angle = i * this.angleIncrement;
      let leaf = new Leaf(angle, leafCircle, this.bigCircleRadius);
      leaf.draw();
    }
```
[![with_dunhuang.png](https://img2.imgtp.com/2024/05/30/QS7xI0yt.png)](https://img2.imgtp.com/2024/05/30/QS7xI0yt.png)



### Adding wave-like effect to the polka dot background
Draw the polka dot background in the `drawPolkDotBackground `function. Calculate the size of the polka dots through a two-level for loop and the sinusoidal function `sin()`, so that the polka dots visually appear as waves that zoom in and out in each column in turn.

```
function drawPolkaDotBackground() {
  // Draw polka dot background
  fill(193, 110, 74);
  noStroke();
  for (let y = 0; y < height; y += dotDensity) {
    for (let x = 0; x < width; x += dotDensity) {
      let size = dotSize * (1 + 0.5 * sin(TWO_PI * (frameCount * 0.008 + x / width)));//let dot size change like wave 
      ellipse(x, y, size);
    }
  }
}
```
[![Tab-Sketch-v3.gif](https://img2.imgtp.com/2024/05/30/a9nWBr6Q.gif)](https://img2.imgtp.com/2024/05/30/a9nWBr6Q.gif)

