const canvas = document.querySelector("canvas")!;
const context = canvas.getContext('2d')!;
let isDrawing = false;

//(color, x, y, type, ctx) {
class Particle {
  type: string;
  x: number;
  y: number;
  color: string;
  speedX = 0;
  speedY = 0;
  gravity = 0.05;
  gravitySpeed = 0;
  constructor(type: string, x: number, y: number, color: string) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.color = color;
  }
  update() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, 1, 1);
  }
  newPos() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
  }
}

class Sandbox {
  particles: Particle[];
  constructor() {
    this.particles = [];
  }
  add(particle: Particle) {
    this.particles.push(particle);
  }
  update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var p of this.particles) {
      p.newPos();
      p.update();
    }
  }
}

var sandbox = new Sandbox(); 
setInterval(() => {
  sandbox.update();
}, 10)

function draw(x:number, y:number, sandbox:Sandbox) {
  var drop = new Particle("water", x, y, "blue");
  sandbox.add(drop);
}

canvas.addEventListener('mousedown', () => {
  isDrawing = true;
});

canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    draw(e.offsetX, e.offsetY, sandbox);
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

