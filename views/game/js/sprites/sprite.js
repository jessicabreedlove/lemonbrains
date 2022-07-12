export default class Sprite {
  constructor() {}

  spritePositionToImagePosition(row, col) {
    return {
      x: this.BORDER_WIDTH + col * (this.SPACING_WIDTH + this.SPRITE_WIDTH),
      y: this.BORDER_WIDTH + row * (this.SPACING_WIDTH + this.SPRITE_HEIGHT),
    };
  }

  animate(animationFrames) {
    // once we hit the end of the cycle, start again
    if (this.frameIndex === animationFrames.length) {
      this.frameIndex = 0;
    }
    this.frame = animationFrames[this.frameIndex];
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(
      this.image,
      this.frame.x,
      this.frame.y,
      this.SPRITE_WIDTH,
      this.SPRITE_HEIGHT,
      0,
      0,
      this.SPRITE_WIDTH,
      this.SPRITE_HEIGHT
    );
    this.frameIndex += 1;
  }
}
