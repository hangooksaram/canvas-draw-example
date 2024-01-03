export class Draw {
  constructor(ctx) {
    this.ctx = ctx;
    this.coord = { x: 0, y: 0 };
  }

  reposition(event) {
    this.coord.x = event.clientX - canvas.offsetLeft;
    this.coord.y = event.clientY - canvas.offsetTop;
  }

  move(event) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "#ACD3ED";

    this.ctx.moveTo(this.coord.x, this.coord.y);
    this.reposition(event);
    this.ctx.lineTo(this.coord.x, this.coord.y);
    this.ctx.stroke();
  }

  resize() {
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
  }
}

export default Draw;
