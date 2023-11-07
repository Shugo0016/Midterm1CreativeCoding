

// The Equation class defines falling equations, their behavior, and display properties.
class Equation {
  constructor() {
    this.x = random(width); // Set a random x position within the canvas
    this.y = random(-100, -10); // Set a random y position above the canvas
    this.equation = this.getRandomEquation(); // Get a random engineering equation
    this.speed = random(1, 5); // Set a random falling speed
    this.shakeAmount = 0; // Initialize shake amount to 0
    this.color = color(255, 0, 0); // Initialize color to red
    this.shakeIncrement = 0.01; // Set the rate at which shake amount increases
  }

  // Get a random engineering equation, concept, or algorithm
  getRandomEquation() {
    // Define an array of engineering equations, concepts, and algorithms
    let equations = [
      "E=mc^2",
      "F=ma",
      "ΔV=IR",
      "∫(sin(x) dx) = -cos(x) + C",
      "F=kx",
      "Recursion",
      "Hashtables",
      "Bubble Sort",
      "Depth First Search",
      "Breadth First Search",
      "Maxwell's Equations",
      "Ohm's Law: V=IR",
      "Newton's Laws",
      "Thevenin's Theorem",
      "Dijkstra's Algorithm",
      "Quicksort",
      "Binary Search",
      "Kirchhoff's Laws",
      "Laplace Transform",
      "Fourier Transform",
      "Navier-Stokes Equations",
      "Finite Element Analysis",
      "Amdahl's Law",
      "Big O Notation",
      "Euler's Method",
      "Lagrangian Mechanics",
      "Huffman Coding",
      "Kalman Filter",
      "Euler's Identity",
      "Boolean Algebra",
      "Principal Component Analysis",
      "Bayes' Theorem",
      "Moore's Law",
      "P vs. NP Problem",
      "Shannon's Information Theory",
      "Gaussian Elimination",
      "Game Theory",
      "Monte Carlo Simulation",
      "Algorithm Complexity",
      "The Halting Problem",
      "Turing Machines",
      "Fractal Geometry",
      "Einstein Field Equations",
      "Stokes' Theorem",
      "Pythagorean Theorem",
      "A* Search Algorithm",
      "Hooke's Law",
      "Coulomb's Law",
      "Schrodinger Equation",
      "Heisenberg Uncertainty Principle",
    ];
  
    // Return a random equation, concept, or algorithm from the array
    return random(equations);
  }

  // Make the equation fall down the screen
  fall() {
    this.y += this.speed;
    // Reset equation if it goes off the screen
    if (this.y > height) {
      this.y = random(-100, -10);
      this.x = random(width);
      this.speed += 0.3; // Gradually increase speed over time
      this.equation = this.getRandomEquation(); // Get a new random equation
      this.shakeAmount = 0; // Reset shake amount
      this.color = color(255, 0, 0); // Reset color to red
    }
  }

  // Update position, color, and shake amount of the equation
  update() {
    this.fall();
    this.shake();
    // Update color based on y position
    let redValue = map(this.y, 0, height, 255, 0);
    this.color = color(255, redValue, redValue);
  }

  // Apply a shaking effect to the equation
  shake() {
    if (this.shakeAmount < 5) {
      this.shakeAmount += this.shakeIncrement;
    }
    let dx = random(-this.shakeAmount, this.shakeAmount);
    let dy = random(-this.shakeAmount, this.shakeAmount);
    this.x += dx;
    this.y += dy;
  }

  // Display the equation on the canvas
  display() {
    fill(this.color);
    textSize(36);
    text(this.equation, this.x, this.y);
  }
}

// Global variables for the sketch
let equations = [];
let drawingStarted = false;
let drawVortex = false;
let arrows = [];
let swervePath = [];
let swerveDrawing = false;
let swerveDestination;
let swerveStart;
let sceneNum = 0;
let startTime = 0;
let ballPos;
let ballSpeed;
let centerPos;
let moving = true;


// Set up the canvas and initialize objects
function setup() {
  createCanvas(800, 800);
  textSize(36);
  angleMode(DEGREES);
  startTime = millis() + 15000;
  ballPos = createVector(random(width, width - 50), random(height, height - 50));
  ballSpeed = createVector(0, 0);
  centerPos = createVector(width / 2, height / 2);
  
  // Initialize arrows for vortex effect
  for (let i = 0; i < 4000; i++) {
    arrows.push(new Arrow());
  }
}

let drawArrow = false;

function draw() {
  background(0);

  if (sceneNum === 0) {
    if (random(1) < 0.1) {
      equations.push(new Equation());
    }
  } else if (sceneNum != 0) {
    equations = [];
  }

  // Update and display equations
  for (let equation of equations) {
    equation.update();
    equation.display();
  }

  if (sceneNum === 1) { 
    if (!swerveDrawing) {
      // Initialize the destination point and start point when drawing starts
      swerveDestination = createVector(random(width), random(height));
      swerveStart = createVector(mouseX, mouseY);
      swervePath = [swerveStart];
      swerveDrawing = true;
    } else {
      // If already drawing, update and display the swerve path
      swerveUpdateAndDisplay();
    }
  }

  if (sceneNum === 2) {
    if (moving) {
      ballPos.x = lerp(ballPos.x, centerPos.x, 0.02);
      ballPos.y = lerp(ballPos.y, centerPos.y, 0.02);
      
      if (p5.Vector.dist(ballPos, centerPos) < 1) {
        moving = false; 
      }
    }
  
    // Draw the ball
    fill(255, 0, 0);
    noStroke();
    ellipse(ballPos.x, ballPos.y, 20, 20);

    for (let arrow of arrows) {
        arrow.display();
    }
        if (millis() >= startTime) {
          // After 10 seconds, start updating arrow positions and angles
          for (let arrow of arrows) {
            arrow.update();
          }
        }
      }
}

// Function to toggle the vortex effect
function keyPressed() {
  if (key === 'S' || key === 's') {
    sceneNum++;
    if (sceneNum > 2) {
      sceneNum = 0;
    }
  }
  
}

function swerveUpdateAndDisplay() {
  if (swerveDrawing) {
    let mousePos = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(swerveDestination, mousePos);
    let distance = dir.mag();

    let swerveStrength = map(distance, 0, 300, 50, 0); // Increase maximum swerve strength
    let swerveAngle = swerveStrength * (PI / 180); // Convert swerve strength to radians

    let currentPos = mousePos.copy(); // Use a copy of the mouse position

    if (distance > 100) { // Apply swerve if not too close to the destination
      dir.rotate(random(-swerveAngle, swerveAngle)); // Apply a random swerve within the angle range
    } else { // When very close to the destination, swerve away sharply
      let repulsion = p5.Vector.fromAngle(random(TWO_PI)).setMag(300 - distance);
      currentPos.add(repulsion); // Modify the current position dramatically
    }

    dir.setMag(3); // Set a constant drawing speed towards the modified position
    currentPos.add(dir);
    swervePath.push(currentPos);

    // Draw the destination point
    fill(0, 255, 0);
    noStroke();
    ellipse(swerveDestination.x, swerveDestination.y, 20, 20);

    // Draw the text
    textAlign(CENTER, CENTER); // Align text to the center
    fill(0,255,0); // Text Color
    noStroke();
    text("Draw a Very Simple Line!", swerveDestination.x, swerveDestination.y - 30);

    // Draw the swerve path
    stroke(255);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let p of swervePath) {
      vertex(p.x, p.y);
    }
    endShape();
  }
}

class Arrow {
  constructor() {
    this.pos = createVector(random(width / 2 - 50, width / 2 + 50), random(height / 2 - 50, height / 2 + 50));
    this.angle = random(360);
    this.scale = random(0.5, 1);
    this.speed = createVector(random(-9, 9), random(-9, 9));
    this.color = color(random(255), random(255), random(255), 150);
  }

  update() {
    this.pos.add(this.speed);
    this.angle += 2;

    if (this.pos.x > width || this.pos.x < 0) {
      this.speed.x *= -1;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.speed.y *= -1;
    }

    let distance = dist(this.pos.x, this.pos.y, width / 2, height / 2);
    if (distance > 100) {
      this.scale = map(distance, 100, width / 2, 1, 0.5);
    } else {
      this.scale = map(distance, 0, 100, 1.5, 1);
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    scale(this.scale);
    fill(this.color);
    noStroke();
    triangle(-10, -5, 10, 0, -10, 5);
    pop();
  }
}

function mousePressed() {
  swerveDrawing = true;
  swervePath = [createVector(mouseX, mouseY)];
  if (sceneNum === 2) {
    arrows.push(new Arrow());
  }
}

function mouseReleased() {
  swerveDrawing = false;
}
