export class Draw {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.coord = { x: 0, y: 0 };
  }

  reposition(event) {
    this.coord.x = event.clientX - this.canvas.offsetLeft;
    this.coord.y = event.clientY - this.canvas.offsetTop;
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

  getInfo() {
    const { colorSpace, height, width, data } = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    const rgbDatas = JSON.stringify(Array.from(data));
    const newImageData = { data: rgbDatas, colorSpace, height, width };
    console.log("canvas 데이터 저장", newImageData);

    return newImageData;
  }
}

export default Draw;
