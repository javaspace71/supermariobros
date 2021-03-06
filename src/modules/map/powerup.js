import { Body } from "matter-js";
import Config from "config";
import Helpers from "../../utils/helpers";

const TEXTURES_DIR = Config.powerup.texturesDir,
  VEL = Config.powerup.vel,
  DELTA_FRAMES = Config.powerup.dFrames,
  GameObject = Helpers.GameObject();

export default class Powerup extends GameObject {
  constructor(x, y, type, map) {
    super(
      x,
      y,
      1,
      1,
      TEXTURES_DIR[type],
      map.textures[TEXTURES_DIR[type][0]],
      "powerup",
      false,
      DELTA_FRAMES
    );

    this.body.friction = 0;
    this.body.frictionAir = 0;
    this.body.slop = 0;

    this.map = map;
    this.type = type;
    this.accel = 0;
    if (this.ype === "mushroom") Body.setVelocity(this.body, { x: VEL, y: 0 });
  }

  hit(body) {
    if (body.label === "player") {
      body.player.consumePowerup(this.type);
      this.delete();
    } else if (this.type === "mushroom")
      Body.setVelocity(this.body, {
        x: this.body.velocity.x > 0 ? -VEL : VEL,
        y: 0
      });
  }
}
