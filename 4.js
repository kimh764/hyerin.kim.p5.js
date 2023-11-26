let centerX = 0.0, centerY = 0.0;

let radius = 65, rotAngle = -80;
let accelX = 0.0, accelY = 0.0;
let deltaX = 0.0, deltaY = 0.0;
let springing = 0.0009, damping = 0.98;

let nodes = 8;

let nodeStartX = [];
let nodeStartY = [];
let nodeX = [];
let nodeY = [];
let angle = [];
let frequency = [];

let organicConstant = 1.0;

function setup() {
  createCanvas(400, 600);

  centerX = width / 2;
  centerY = height / 2;

  for (let i = 0; i < nodes; i++){
    nodeStartX[i] = 0;
    nodeStartY[i] = 0;
    nodeY[i] = 0;
    nodeY[i] = 0;
    angle[i] = 0;
  }


  for (let i = 0; i < nodes; i++){
    frequency[i] = random(9, 12);
  }

  noStroke();
  frameRate(30);
}

function draw() {

  fill(0, 100);
  rect(0, 0, width, height);
  drawShape();
  moveShape();
}

function drawShape() {

  for (let i = 0; i < nodes; i++){
    nodeStartX[i] = centerX + cos(radians(rotAngle)) * radius;
    nodeStartY[i] = centerY + sin(radians(rotAngle)) * radius;
    rotAngle += 360.0 / nodes;
  }


  curveTightness(organicConstant);
  fill(255);
  beginShape();
  for (let i = 0; i < nodes; i++){
    curveVertex(nodeX[i], nodeY[i]);
  }
  for (let i = 0; i < nodes-1; i++){
    curveVertex(nodeX[i], nodeY[i]);
  }
  endShape(CLOSE);
}

function moveShape() {

  deltaX = mouseX - centerX;
  deltaY = mouseY - centerY;

  deltaX *= springing;
  deltaY *= springing;
  accelX += deltaX;
  accelY += deltaY;


  centerX += accelX;
  centerY += accelY;

  accelX *= damping;
  accelY *= damping;


  organicConstant = 1 - ((abs(accelX) + abs(accelY)) * 0.1);

  for (let i = 0; i < nodes; i++){
    nodeX[i] = nodeStartX[i] + sin(radians(angle[i])) * (accelX * 2);
    nodeY[i] = nodeStartY[i] + sin(radians(angle[i])) * (accelY * 2);
    angle[i] += frequency[i];
  }
}

