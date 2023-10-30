class Equation {
  constructor() {
    this.x = random(width);
    this.y = random(-100, -10);
    this.equation = this.getRandomEquation(); // Get a random engineering equation
    this.speed = random(1, 5);
    this.shakeAmount = 0; // Start with no shake
    this.color = color(255, 0, 0); // Start with red color
    this.shakeIncrement = 0.01; // Adjust the rate of shake increase
  }

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

  fall() {
    this.y += this.speed;

    // Reset equation if it goes off the screen
    if (this.y > height) {
      this.y = random(-100, -10);
      this.x = random(width);
      this.speed += 0.3; // Increase speed slightly over time
      this.equation = this.getRandomEquation(); // Get a new random equation
      this.shakeAmount = 0; // Reset the shake amount
      this.color = color(255, 0, 0); // Reset the color to red
    }
  }

  update() {
    // Update the text color to transition from white to red over time
    let redValue = map(this.y, 0, height, 255, 0);
    this.color = color(255, redValue, redValue);
}

  shake() {
    // Increase the shake amount gradually over time
    if (this.shakeAmount < 5) {
      this.shakeAmount += this.shakeIncrement;
    }
    let dx = random(-this.shakeAmount, this.shakeAmount);
    let dy = random(-this.shakeAmount, this.shakeAmount);
    this.x += dx;
    this.y += dy;
  }

  display() {
    fill(this.color);
    textSize(36);
    text(this.equation, this.x, this.y);
  }
}

let equations = [];

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);

  // Create new equations
  if (random(1) < 0.1) {
    equations.push(new Equation());
  }

  // Update and move equations
  for (let equation of equations) {
    equation.fall();
    equation.shake(); // Apply the shaking effect
    equation.update(); // Update the text color
    equation.display();
  }
}
