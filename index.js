import Draw from "./Draw.js";
import { createCanvasElement, canvasToImage } from "./canvas.js";

let originalDrawInstance;

document.addEventListener("DOMContentLoaded", () => {
  const { canvas, ctx } = createCanvasElement();
  originalDrawInstance = new Draw(canvas, ctx);
  attachDrawEvent(originalDrawInstance);
});

const loadCanvas = () => {
  const loadedCanvas = document.getElementById("loaded-canvas");
  const ctx = loadedCanvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  originalDrawInstance.getInfo();

  const canvasData = {
    ...originalDrawInstance.getInfo(),
  };

  const uintArray = new Uint8ClampedArray(
    JSON.parse(originalDrawInstance.getInfo().data)
  );
  const newImageData = new ImageData(uintArray, 300, 150);

  console.log("canvas 데이터 로드", newImageData);

  ctx.putImageData(newImageData, 0, 0);

  const loadedDrawInstance = new Draw(loadedCanvas, ctx);

  attachDrawEvent(loadedDrawInstance);
};

const attachDrawEvent = (drawInstance) => {
  const drawMove = (e) => drawInstance.move(e);

  function start(event) {
    document.addEventListener("mousemove", drawMove);
    drawInstance.reposition(event);
  }

  function stop() {
    document.removeEventListener("mousemove", drawMove);
  }

  document.addEventListener("mousedown", (e) => start(e));
  document.addEventListener("mouseup", stop);
  window.addEventListener("resize", drawInstance.resize);
  document.getElementById("put-canvas-data").addEventListener("click", () => {
    loadCanvas();
  });
};

document
  .getElementById("canvas-to-image-button")
  .addEventListener("click", () => {
    canvasToImage();
  });
