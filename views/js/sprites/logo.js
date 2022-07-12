import Sprite from './sprite.js';

export default class Logo extends Sprite {
  SPRITE_WIDTH = 128; // The total width in px divided by the number of columns
  SPRITE_HEIGHT = 128; // The total height in px divided by the total rows
  BORDER_WIDTH = 1;
  SPACING_WIDTH = 1;
  canvas = document.querySelector('.logo-sprite');
  context = this.canvas.getContext('2d');
  spriteSheetURL = 'Assets/Spritesheets/Logo.png';
  // misc
  frameIndex = 0;
  frame;
  image = new Image();

  // Animations
  logo1 = this.spritePositionToImagePosition(0, 0);
  logo2 = this.spritePositionToImagePosition(0, 1);
  logo3 = this.spritePositionToImagePosition(1, 0);
  logo4 = this.spritePositionToImagePosition(1, 1);
  logo5 = this.spritePositionToImagePosition(2, 0);
  logo6 = this.spritePositionToImagePosition(2, 1);
  bubble = [
    this.logo1,
    this.logo2,
    this.logo3,
    this.logo4,
    this.logo5,
    this.logo6,
  ];

  // Speeds
  bubbleSpeed = 500;

  constructor() {
    super();
    this.image.src = this.spriteSheetURL;
    this.image.crossOrigin = true;
  }

  // Will likely need to use clearInterval to destroy the zombies https://www.w3schools.com/jsref/met_win_clearinterval.asp
  bubbleAnimation() {
    setInterval(() => {
      this.animate(this.bubble);
    }, this.bubbleSpeed);
  }
}
