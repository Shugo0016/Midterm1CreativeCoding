// Stream of binary numbers class 
class Stream {
  constructor(x, y, speed, length, color) {
    this.x = x; // Location of stream on x axis
    this.y = y; // Location of stream on y axis
    this.speed = speed; // Speed of stream
    this.chars = generateRandomBinary(length); // length of stream and binary numbers generated
    this.color = color; // color of stream
  }


  display() {
    // saves drawing style settings
    push();
    
    // moves streams location to x and y 
    translate(this.x, this.y);
    
    // Set the fill color for the text to the stream's color
    fill(this.color);
    

    for (let j = 0; j < this.chars.length; j++) {
      // displays characters 
      text(this.chars[j], 0, j * 20);
    }
    
    // Restore the original drawing style settings and transformation state
    pop();
  }

  // Moves stream 
  move() {
    // Moves characters down the y axis for falling by the speed set
    this.y += this.speed;

    // Checks if characters have moved passed the height of the canves so they can be moved back
    // to the top
    if (this.y - this.chars.length * 20 > height) {
      this.y = 0 - this.chars.length * 20;
    }
  }
}

// Chooses a character from 0 and 1 and pushes to chars array
function generateRandomBinary(length) {
  let chars = [];
  for (let i = 0; i < length; i++) {
    chars.push(random(1) < 0.5 ? '0' : '1');
  }
  return chars;
}

let streams = [];
let streamLength = 50;

function setup() {
  createCanvas(800, 800);
  textSize(16);
  textFont('Courier');
}


function draw() {
  background(0, 150);
  // For each stream in the streams array it will display them and move them
  for (let stream of streams) {
    stream.display();
    stream.move();
  }
}

// when mouse is clicked new stream is created at that position on the canvas 
function mouseClicked() {
  let col = color(random(255), random(255), random(255));
  let stream = new Stream(mouseX, mouseY, random(2, 6), streamLength, col);
  streams.push(stream);
}


 // Clear all streams from canvas when "C" is pressed
function keyPressed() {
  if (key === 'C' || key === 'c') {
    streams = []; 
  }
}
