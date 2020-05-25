//range of rad from json should be 0.15<n<1

//aim-point variables
let aim_rad, aim_x, aim_y, aim_z, aim_tipangle;

//camera variables
let cam_x, cam_y, cam_z;
let cam_dx, cam_dy, cam_dz, cam_perpendicular_dx;
let pan, tilt;

//movement variables
let forward, back, left, right;
let jump_toggle = false;


//user variables
let sensitivity;


class Target {
  constructor(jsonobj) {
    this.appear_time = jsonobj.appear_time;
    this.rad = (-cam_z) * jsonobj.rad;
    this.jsonrad = HALF_PI * jsonobj.rad;
    this.pos = createVector(cam_x + (this.rad) * sin(radians(jsonobj.pan)), cam_y + (this.rad) * sin(radians(jsonobj.tilt)), cam_z + (this.rad) * cos(radians(jsonobj.pan)) * cos(radians(jsonobj.tilt)));
    this.width = jsonobj.width / 2;
    this.diagonal = this.width * sqrt(2);
    this.centeranglex = atan((this.pos.x - cam_x) / (this.pos.z - cam_z));
    this.centerangley = atan((this.pos.y - cam_y) / (this.pos.z - cam_z));
    this.distance = sqrt(sq(this.pos.x - cam_x) + sq(this.pos.z - cam_z));
    this.tipangle = asin(this.diagonal / this.distance);
    this.leftangle = this.centeranglex - this.tipangle;
    this.rightangle = this.centeranglex + this.tipangle;
    this.upangle = this.centerangley + this.tipangle;
    this.downangle = this.centerangley - this.tipangle;

    this.detect;
    this.isrendering;
  }

  render() {
    if (this.detect == false) {
      this.isrendering = true;
      push();
      tint(0, 255, 0);
      translate(this.pos);
      box(50, 50, 50);
      pop();
    } else if (this.detect == true) {
      this.isrendering = false;
    }
  }

  detected() {
    if (this.detect == false && this.isrendering == true) {
      if (pan + (1.75 + 10 * cos(this.jsonrad)) * aim_tipangle <= this.rightangle && pan - (1.75 + 10 * cos(this.jsonrad)) * aim_tipangle >= this.leftangle &&
        tilt + (1.75 + 10 * cos(this.jsonrad)) * aim_tipangle <= this.upangle && tilt - (1.75 + 10 * cos(this.jsonrad)) * aim_tipangle >= this.downangle) {
        this.detect = true;
      } else this.detect = false;
    }
    return this.detect;
  }
}


function handleUserInput() {
  let s = 1; // moving speed
  let g = -0.01; //gravity
  let v = 1; //initial speed
  let t; //time passed

  if (forward == true) {
    cam_z += s * (cam_dz);
    cam_x += s * (cam_dx);
  }
  if (back == true) {
    cam_z -= s * (cam_dz);
    cam_x -= s * (cam_dx);
  }
  if (left == true) {
    cam_x -= s * (cam_perpendicular_dx);
    cam_z += s * (cam_dx);
  }
  if (right == true) {
    cam_x += s * (cam_perpendicular_dx);
    cam_z -= s * (cam_dx);
  }

  if (jump_toggle == true) {

    t = (millis() - t0) / 3;
    cam_y = 30 + v * t + (1 / 2) * g * sq(t);

    if (cam_y <= 0) {
      cam_y = 0;
      jump_toggle = false;
    }
  }

}


function updateCamCenter() {
  cam_dz = cos(pan) * cos(tilt);
  cam_dx = sin(pan);
  cam_dy = sin(tilt);
  cam_perpendicular_dx = cos(pan);

  // compute scene center position
  cam_cx = cam_x + cam_dx * (-cam_z);
  cam_cy = cam_y + cam_dy * (-cam_z);
  cam_cz = cam_z + (cam_dz) * (-cam_z);

  //compute aiming point position
  aim_x = cam_x + cam_dx * aim_rad;
  aim_y = cam_y + cam_dy * aim_rad;
  aim_z = cam_z + (cam_dz) * aim_rad;
  aim_tipangle = asin(0.25 / sqrt(sq(aim_x - cam_x) + sq(aim_z - cam_z)));
}
