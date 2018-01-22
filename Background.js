// Background class
function Background(source, width, height, bgSpeed) {
  this.img = new Image();
  this.img.src = source;
  this.scale = 1; /* to be tested */
  this.x = 0;
  this.y = 0;
  this.canvasWidth = width;
  this.canvasHeight = height;
  this.dy = bgSpeed;
  this.imgW = this.img.width;
  this.imgH = this.img.height;
  //   Loading image
  that = this;
  this.img.onload = function() {
    that.imgW = that.canvasHeight * that.scale;
    that.imgH = that.img.height * that.scale;
  };
  //   Drawing image
  this.draw = function(context) {
    // imageNB = Math.floor(that.canvasHeight / that.imgH) + 1; -- imageNB = Infinity
    for (var i = 0; i < 4; i++) {
      context.drawImage(
        this.img,
        this.x,
        this.y + i * this.imgH,
        this.imgW,
        this.imgH
      );
    }
    if (this.y < 0) {
      context.drawImage(
        this.img,
        this.x,
        this.y + 4 * this.imgH,
        this.imgW,
        this.imgH
      );
    }

    that.y += that.dy;
  };
}
