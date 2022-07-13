import Sprite from './sprite.js';

export default class LemonadeStand extends Sprite {
  SPRITE_WIDTH = 320; // The total width in px divided by the number of columns
  SPRITE_HEIGHT = 320; // The total height in px divided by the total rows
  BORDER_WIDTH = 1;
  SPACING_WIDTH = 1;
  canvas;
  context;
  spriteSheetURL = 'Assets/Spritesheets/Lemonade Stand.png';
  // misc
  frameIndex = 0;
  frame;
  image = new Image();
  canvasQuery;

  // Animations
  openEyes = this.spritePositionToImagePosition(0, 0);
  closeEyes = this.spritePositionToImagePosition(0, 1);
  blink = [
    this.openEyes,
    this.openEyes,
    this.openEyes,
    this.openEyes,
    this.openEyes,
    this.openEyes,
    this.closeEyes,
  ];

  // Speeds
  animationSpeed = 500;

  constructor() {
    super();
    this.canvasQuery = '.lemonade-stand';
    this.canvas = document.querySelector(this.canvasQuery);
    this.context = this.canvas.getContext('2d');
    this.image.src = this.spriteSheetURL;
    this.image.crossOrigin = true;
  }

  blinkAnimation() {
    setInterval(() => {
      this.animate(this.blink);
    }, this.animationSpeed);
  }

  getXCoordinate() {
    return this.canvas.getBoundingClientRect().x;
  }
}
