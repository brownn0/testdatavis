function draw() {
  background(10);
  orbitControl();
  rotateY(frameCount * 0.002);
  ambientLight(80);
  pointLight(255, 255, 255, 0, 0, 0);

  // Stars
  push();
  noStroke();
  for (let s of stars) {
    let twinkle = sin(frameCount * 0.02 + s.x) * 50;
    fill(s.brightness + twinkle);
    push();
    translate(s.x, s.y, s.z);
    sphere(2, 6, 6);
    pop();
  }
  pop();

  // Sun
  push();
  noStroke();
  emissiveMaterial(255, 120, 0);
  sphere(120, 48, 48);
  pop();

  // Orbits
  for (let planet of planets) {
    push();
    rotateX(90);
    noFill();
    stroke(planet.color[0], planet.color[1], planet.color[2], 100);
    strokeWeight(2);
    beginShape();
    for (let a = 0; a < 360; a += 5) {
      let x = cos(a) * planet.orbit;
      let y = sin(a) * planet.orbit;
      vertex(x, y, 0);
    }
    endShape(CLOSE);
    pop();
  }

  // Planets
  for (let planet of planets) {
    push();
    rotateY(planet.angle);
    translate(planet.orbit, 0, 0);
    noStroke();
    emissiveMaterial(planet.color[0], planet.color[1], planet.color[2]);
    sphere(planet.size, 24, 24);
    pop();

    planet.angle += planet.speed;
  }

  // 2D overlay
  resetMatrix();
  translate(-width / 2, -height / 2, 0);

  // Main legend at top
  image(legend, (width - legend.width) / 2, 20);

  // 🪐 Floating app names above the Sun
  push();
  textSize(20);
  textAlign(CENTER, TOP);
  fill(255);
  text("Apps in Orbit", width / 2, 220);

  let lineHeight = 28;
  for (let i = 0; i < planets.length; i++) {
    let planet = planets[i];
    fill(planet.color[0], planet.color[1], planet.color[2]);
    text(planet.name, width / 2, 260 + i * lineHeight);
  }
  pop();

  // Selected app box
  if (selectedApp) {
    push();
    fill(0, 200);
    noStroke();
    rectMode(CORNER);
    rect(20, height - 180, 360, 160, 10);

    fill(255);
    textSize(18);
    textAlign(LEFT, TOP);
    text("📱 " + selectedApp.name, 40, height - 160);
    text("Time spent: " + selectedApp.hours + " hrs", 40, height - 120);
    text("Notifications: " + selectedApp.notifications, 40, height - 90);
    text("Category: " + selectedApp.category, 40, height - 60);
    pop();
  }
}


