const createCanvasElement = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return ctx;
};

const canvasToImage = () => {
  const canvas = document.getElementById("canvas");
  const imgBase64 = canvas.toDataURL("image/jpeg", "image/octet-stream");
  const decodImg = atob(imgBase64.split(",")[1]);

  const array = [];
  for (let i = 0; i < decodImg.length; i += 1) {
    array.push(decodImg.charCodeAt(i));
  }

  const file = new Blob([new Uint8Array(array)], { type: "image/jpeg" });
  const fileName = `canvas_img_${new Date().getMilliseconds()}.jpg`;
  const formData = new FormData();

  formData.append("file_give", file, fileName);

  document.getElementById("canvas-draw-image").src = imgBase64;
};

export { createCanvasElement, canvasToImage };
