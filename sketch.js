let aim_rad, aim_x, aim_y, aim_z, aim_tipangle;
let target = [];
let json;

function preload(){
  json = loadJSON("fps/targets.json");
}

function setup(){
  for (let i = 0; i < Object.keys(json).length; i++) {
    target[i] = new People(object[i]);
    target[i].detect = false;
  }
}

function draw(){
  for (let i = 0; i < Object.keys(json).length; i++) {
    target[i].render();
  }
}

function mouseClicked(){
  for (let i = 0; i < Object.keys(json).length; i++) {
    target[i].detected();
  }
}
