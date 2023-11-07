

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
      // Add more equations or concepts here
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
let tree;
let treeDepth = 5;
let drawingStarted = false;
let drawVortex = false;
let arrows = [];
let swervePath = [];
let swerveDrawing = false;
let swerveDestination;
let swerveStart;


// Set up the canvas and initialize objects
function setup() {
  createCanvas(800, 800);
  textSize(36);
  angleMode(DEGREES);
  
  // Initialize arrows for vortex effect
  for (let i = 0; i < 1000; i++) {
    arrows.push(new Arrow());
  }
}

// Draw the sketch on each animation frame
// Global variable to track if the circle should be drawn
let drawArrow = false;

function draw() {
  background(0);
  let currentTime = millis();

  // Control spawning and clearing of equations
  if (currentTime < 25000) {
    if (random(1) < 0.1) {
      equations.push(new Equation());
    }
  } else if (!drawingStarted) {
    equations = [];
    drawingStarted = true;
  }

  // Update and display equations
  for (let equation of equations) {
    equation.update();
    equation.display();
  }

  if (drawingStarted && currentTime < 40000) { // Stop after 40 seconds
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

   if (currentTime >= 40000 && !drawArrow) {
    drawingStarted = false;
    drawArrow = true; // Set flag to start drawing the circle
    tree = []; // Clear the tree array
  }

  // Draw circle as a placeholder
  if (drawArrow) {
    for (let arrow of arrows) {
      arrow.update();
      arrow.display();
    }
  }
}

// Function to toggle the vortex effect
function keyPressed() {
  if (key === 'V' || key === 'v') {
    drawVortex = !drawVortex; // Toggle drawVortex when 'V' key is pressed
  }
}

// Function to update and display the swerve line
function swerveUpdateAndDisplay() {
  if (swerveDrawing) {
    let currentPos = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(swerveDestination, currentPos);
    let distance = dir.mag();

    // Swerve the line more drastically if it is close to the destination
    if (distance < 200) { // Increased the distance for swerving to be more apparent
      let swerveAngle = map(distance, 0, 200, PI / 2, 0); // Swerve by up to 90 degrees
      dir.rotate(swerveAngle); // Apply the swerve
    }

    // Prevent the line from reaching the destination
    if (distance < 20) {
      dir.setMag(-5); // Push away from the destination
    } else {
      dir.setMag(3); // Continue drawing towards the mouse
    }

    // Apply the direction to the current position
    currentPos.add(dir);
    // Add the adjusted current position to the path
    swervePath.push(currentPos);

    // Draw the destination point
    fill(0, 255, 0);
    noStroke();
    ellipse(swerveDestination.x, swerveDestination.y, 20, 20);

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
    this.pos = createVector(width/2, height/2);
    this.angle = random(360);
    this.scale = random(0.5, 1);
    this.speed = createVector(random(-2, 2), random(-2, 2));

    this.color = color(random(255), random(255), random(255), 150);
  }

  update() {
    this.pos.add(this.speed);
    this.angle += 2;
  
    // Bouncing logic
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

// Override mousePressed and mouseReleased for swerve drawing
function mousePressed() {
  // Start swerve drawing
  swerveDrawing = true;
  swervePath = [createVector(mouseX, mouseY)];
}

function mouseReleased() {
  // Stop swerve drawing
  swerveDrawing = false;
}