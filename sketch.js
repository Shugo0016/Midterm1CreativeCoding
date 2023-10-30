class Equation {
  constructor() {
    this.x = random(width);
    this.y = random(-100, -10);
    this.equation = this.getRandomEquation(); // Get a random engineering equation
    this.speed = random(1, 5);
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
    }
  }
}

let equations = [];

function setup() {
  createCanvas(800, 800);
  textSize(36);
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
    fill(255);
    text(equation.equation, equation.x, equation.y);
  }
}