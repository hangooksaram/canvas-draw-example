import Draw from "./Draw.js";
import { createCanvasElement, canvasToImage } from "./canvas.js";

let drawInstance;

document.addEventListener("DOMContentLoaded", () => {
  const ctx = createCanvasElement();
  drawInstance = new Draw(ctx);

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
});

document
  .getElementById("canvas-to-image-button")
  .addEventListener("click", () => {
    canvasToImage();
  });
