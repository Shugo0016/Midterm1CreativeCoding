// This is a creative coding project, The project details can be found here https://github.com/IDMNYU/CreativeCoding_FA23_SectionA_LadyK/blob/main/MidTermProject.md
// The adjective I have chosen is Hopelessness. Because I want that's how I feel. 

function setup() {
  createCanvas(800, 800);
  noFill();
  stroke(255); // White lines
}

let raindrops = [];

function draw() {
  background(0); // Black background

  // Create new raindrops
  for (let i = 0; i < 10; i++) {
    let x = random(width); // Random x position
    let y = random(-100, -10); // Random y position above the canvas
    let speed = random(5, 15); // Random falling speed
    let len = random(10, 30); // Random line length
    raindrops.push({ x, y, speed, len });
  }

  // Code for house 
  

  // Update and display raindrops
  for (let i = raindrops.length - 1; i >= 0; i--) {
    let drop = raindrops[i];
    line(drop.x, drop.y, drop.x, drop.y + drop.len); // Draw raindrop

    drop.y += drop.speed; // Move raindrop down

    // Remove raindrop if it goes below the canvas
    if (drop.y > height) {
      raindrops.splice(i, 1);
    }
  }


}