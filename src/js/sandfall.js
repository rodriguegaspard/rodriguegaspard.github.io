const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');
let isDrawing = false;

function draw(x, y, ctx) {
  ctx.fillStyle = "blue";
  ctx.fillRect(x,y,10,10);
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  console.log(e.offsetX + ":" + e.offsetY)
});

canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    draw(e.offsetX, e.offsetY, context);
  console.log(e.offsetX + ":" + e.offsetY)
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

