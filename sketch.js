

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

// The Branch class defines the properties and behaviors of the binary search tree branches.
class Branch {
  constructor(start, end, depth) {
    this.start = start; // Starting point of the branch
    this.end = end; // Ending point of the branch
    this.depth = depth; // Depth of the branch in the tree
    this.finished = false; // Flag to check if the branch has finished growing
    this.current = start.copy(); // Current end point of the branch while it's growing
    this.speed = p5.Vector.sub(end, start).div(25); // Speed and direction of growth
  }

  // Update the current position of the branch's end point
  update() {
    this.current.add(this.speed);
    // Check if the branch has finished growing
    if (p5.Vector.dist(this.current, this.end) < 1) {
      this.finished = true;
    }
  }

  // Display the branch on the canvas
  show() {
    if (this.start.x >= 0 && this.start.x <= width && this.start.y >= 0 && this.start.y <= height) {
      let colStart = color(255); // White for leaves
      let colEnd = color(75, 0, 130); // Dark Purple for root
      let lerpAmt = map(treeDepth - this.depth, 0, treeDepth, 0, 1);
      let col = lerpColor(colStart, colEnd, lerpAmt);
      
      stroke(col);
      strokeWeight(5);
      line(this.start.x, this.start.y, this.current.x, this.current.y);
    }
  }

  // Check if it's time to branch
  timeToBranch() {
    return this.finished && millis() % 1000 < 50 && this.depth > 0;
  }


  // Create a new branch from this branch
branch(right) {
  let angleVariation = random(-PI / 6, PI / 6); // Increased angle variation
  let angle = right ? PI / 4 : -PI / 4; // Adjusted angle for right or left branch
  angle += angleVariation;
  let dir = p5.Vector.sub(this.end, this.start);
  dir.rotate(angle).mult(random(0.7, 0.9)); // Adjusted length multiplier
  let newEnd = p5.Vector.add(this.end, dir);
  let newBranch = new Branch(this.end, newEnd, this.depth - 1);
  newBranch.speed.rotate(angle); // Rotate the speed vector for proper growth direction
  return newBranch;
}

}

// Global variables for the sketch
let equations = [];
let tree;
let treeDepth = 5;
let lastBranchTime = 0;
let drawingStarted = false;
let drawVortex = false;
let arrows = [];

// Set up the canvas and initialize objects
function setup() {
  createCanvas(800, 800);
  let start = createVector(width / 2, height / 2);
  let end = createVector(width / 2, 350);
  tree = [new Branch(start, end, treeDepth)];
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

  // Start drawing the binary search tree
  if (drawingStarted && currentTime < 40000) { // Stop after 40 seconds
    if (currentTime % 5000 < 50 && currentTime > 25000) { // Every 5 seconds, after 25 seconds
      let startX = random(width);
      let startY = random(height);
      let start = createVector(startX, startY);
      let end = start.copy().add(p5.Vector.random2D().mult(50));
      tree.push(new Branch(start, end, treeDepth));
    }
    treeDepth = 5 + floor(currentTime / 10000);
    let branchInterval = max(100, 1000 - currentTime / 5000); 
    if (currentTime - lastBranchTime > branchInterval) {
      for (let i = tree.length - 1; i >= 0; i--) {
        let branch = tree[i];
        if (branch.timeToBranch()) {
          tree.push(branch.branch(true));
          tree.push(branch.branch(false));
          lastBranchTime = currentTime;
        }
      }
    }

    // Update and display branches
    for (let branch of tree) {
      branch.update();
      branch.show();
    }
  } else if (currentTime >= 40000 && !drawArrow) {
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