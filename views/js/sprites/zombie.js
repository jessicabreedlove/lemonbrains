import Sprite from './sprite.js';

export default class Zombie extends Sprite {
  SPRITE_WIDTH = 320; // The total width in px divided by the number of columns
  SPRITE_HEIGHT = 320; // The total height in px divided by the total rows
  BORDER_WIDTH = 1;
  SPACING_WIDTH = 1;
  canvas;
  context;
  spriteSheetURL = 'Assets/Spritesheets/zombie-walking-left.png';
  // misc
  frameIndex = 0;
  frame;
  image = new Image();
  canvasQuery;

  // Animations
  zombie0 = this.spritePositionToImagePosition(0, 0);
  zombie1 = this.spritePositionToImagePosition(0, 1);
  walkCycle = [this.zombie0, this.zombie1];

  // Speeds
  walkingSpeed = 500;

  constructor(canvasQuery) {
    super();
    this.canvas = document.querySelector(canvasQuery);
    this.context = this.canvas.getContext('2d');
    this.image.src = this.spriteSheetURL;
    this.image.crossOrigin = true;
    this.canvasQuery = canvasQuery;
  }

  walkLeft() {
    setInterval(() => {
      this.animate(this.walkCycle);
    }, this.walkingSpeed);
  }

  getXCoordinate() {
    return this.canvas.getBoundingClientRect().x;
  }
}
