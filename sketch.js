let target = []; //array of target objects
let json; //json file
let sensitivity_slider; //a visual graph of mouse sensitivity

function preload() {
  json = loadJSON("fps/targets.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  //camera set-up
  cam_x = 0;
  cam_y = 0;
  cam_z = -(windowHeight / 2 / tan(PI * 30.0 / 180.0));
  cam_dx = 0;
  cam_dy = 0;
  cam_dz = 0;
  pan = 0;
  tilt = 0;

  //aim point set-up
  aim_rad = (-cam_z) / 10;

  //load JSON datas into target objects
  for (let i = 0; i < Object.keys(json).length; i++) {
    target[i] = new Target(json[i]);
    target[i].detect = false;
  }

  //default mouse sensitivity
  sensitivity = 8;

  //sensitivity slider (doesn't work in mouse, but shows current sensitivity.)
  //you can control sensitivity by UP/DOWN arrow key.
  sensitivity_slider = createSlider(1, 20);
  sensitivity_slider.position(10, 10);
}

function draw() {
  background(0);
  lights();

  //render target objects
  for (let i = 0; i < Object.keys(json).length; i++) {
    target[i].render();
  }

  //camera set-up
  updateCamCenter();
  camera(cam_x, cam_y, cam_z, cam_cx, cam_cy, cam_cz, 0, -1, 0);
  pan += radians(movedX) / sensitivity;
  tilt -= radians(movedY) / sensitivity;

  //aimpoint set-up
  push();
  translate(aim_x, aim_y, aim_z);
  fill(255, 255, 255);
  noStroke();
  sphere(0.5, 4, 4);
  pop();


  //change sensitivity (by UP/DOWN arrows)
  if (keyIsPressed) {
    if (keyCode == UP_ARROW) {
      sensitivity -= 0.1;
      if (sensitivity >= 20) {
        sensitivity = 20;
      }
    } else if (keyCode == DOWN_ARROW) {
      sensitivity += 0.1;
      if (sensitivity <= 1) {
        sensitivity = 1;
      }
    }
  }
  sensitivity_slider.value(16 - sensitivity);
}

function mouseClicked() {
  //check detection
  for (let i = 0; i < Object.keys(json).length; i++) {
    target[i].detected();
  }
  //lock pointer
  requestPointerLock();
}
