class Renderer {
  canvas = document.querySelector("canvas")!;
  context = this.canvas.getContext("2d")!;
  draw(particle: Particle) {
    this.context.fillStyle = particle.color;
    this.context.fillRect(particle.x, particle.y, 1, 1);
  }
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

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
  createParticle(x: number, y:number, type:string, color: string) {
    var particle = new Particle(type, x, y, color);
    this.particles.push(particle);
  }
  update(renderer: Renderer) {
    renderer.clear();
    for (var particle of this.particles) {
      particle.newPos();
      renderer.draw(particle);
    }
  }
}

var sandbox = new Sandbox();
var renderer = new Renderer();
let isDrawing = false;
setInterval(() => {
  sandbox.update(renderer);
}, 10)

renderer.canvas.addEventListener('mousedown', () => {
  isDrawing = true;
});

renderer.canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    sandbox.createParticle(e.offsetX, e.offsetY, "water", "blue")
  }
});

renderer.canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});
