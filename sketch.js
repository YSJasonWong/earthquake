let data = {}, bg, ratio, rad = 0;

fetch('https://data.weather.gov.hk/weatherAPI/opendata/earthquake.php?dataType=qem&lang=en')
  .then(response => response.json())
  .then(k => data=k);

function preload() {
  bg = loadImage('world (1).svg');
}

function setup() {
  createCanvas(windowWidth-1, windowHeight-1);
  ratio = bg.width/bg.height;
  imageMode(CENTER);
}

function draw() {
  background(0);
  image(bg, width/2, height/2, width, width/ratio);
  let x = map(data.lon, -180, 180, 0, width);
  let y = map(data.lat, -90, 90, height/2+width/ratio/2, height/2-width/ratio/2);
  fill(255, 0, 0);
  stroke(255, 0, 0);
  ellipse(x, y, width*0.01);
  let maxRad = map(data.mag, 6, 9, width*0.1, width*0.3);
  rad = (rad+1)%maxRad;
  noFill();
  for (let i = 0; i<5; i++) {
    ellipse(x, y, rad/i);
  }
  fill(255);
  noStroke();
  textAlign(RIGHT, BOTTOM);
  text(`Region: ${data.region}, Magitude: ${data.mag}, ${data.ptime}`, width-10, height-10);
  
}
