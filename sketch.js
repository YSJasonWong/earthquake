let data = {}, bg, ratio, rad = 0;

fetch('https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php?dataType=qem&lang=en')
  .then(response => response.json())
  .then(k => data=k);

function preload() {
  bg = loadImage('world.svg');
}

function setup() {
  createCanvas(windowWidth-1, windowHeight-1);
  ratio = bg.width/bg.height;
  imageMode(CENTER);
}

function draw() {
  background(0);
  image(bg, width/2, height/2, width, width/ratio);
  textSize(width*0.05);
  textAlign(CENTER, CENTER);
  text(`Last Earthquake Occured`, width/2, height*0.1);
  fill(255, 0, 0);
  stroke(255, 0, 0);
  ellipse(getX(data.lon), getY(data.lat), width*0.01);
  let maxRad = map(data.mag, 6, 9, width*0.1, width*0.3);
  rad = (rad+1)%maxRad;
  noFill();
  for (let i = 0; i<5; i++) {
    ellipse(getX(data.lon), getY(data.lat), rad/i);
  }
  fill(255);
  noStroke();
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text(`Last update: ${data.updateTime}`, 10, height-10);
  textAlign(RIGHT, BOTTOM);
  text(`Region: ${data.region}, Magitude: ${data.mag}, ${data.ptime}`, width-10, height-10);
}

function getX(input) {
  return map(input, -180, 180, -width*0.05, width);
}

function getY(input) {
  return map(input, -90, 90, height/2+width/ratio*0.35, height/2-width/ratio*0.35);
}
