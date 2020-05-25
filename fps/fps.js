//range of rad from json should be 0.15<n<1
class target {
  constructor(jsonobj) {
    this.appear_time = jsonobj.appear_time;
    this.rad = (-cam_z) * jsonobj.rad;
    this.jsonrad = HALF_PI * jsonobj.rad;
    this.pos = createVector(cam_x + (this.rad) * sin(radians(jsonobj.pan)), cam_y + (this.rad) * sin(radians(jsonobj.tilt)), cam_z + (this.rad) * cos(radians(jsonobj.pan)) * cos(radians(jsonobj.tilt)));
    this.width = jsonobj.width/2;
    this.diagonal = this.width * sqrt(2);
    this.centeranglex = atan((this.origin.x - cam_x) / (this.origin.z - cam_z));
    this.centerangley = atan((this.origin.y - cam_y) / (this.origin.z - cam_z));
    this.distance = sqrt(sq(this.origin.x - cam_x) + sq(this.origin.z - cam_z));
    this.tipangle = asin(this.diagonal / this.distance);
    this.leftangle = this.centeranglex - this.tipangle;
    this.rightangle = this.centeranglex + this.tipangle;
    this.upangle = this.centerangley + this.tipangle;
    this.downangle = this.centerangley - this.tipangle;

    this.texture = jsonobj.texture;
    this.detect;
    this.isrendering;
  }

  render() {
    if (this.detect == false) {
        this.isrendering = true;
        push();
        tint(0, 255, 0);
        texture(peopletexture[this.texture]);
        translate(this.pos);
        box(50, 50, 50);
        pop();
    } else if(this.detect == true){
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
