let isDrawing = false;

class Renderer {
  canvas = document.querySelector("canvas")!;
  context = this.canvas.getContext("2d")!;
  draw(particle: Particle) {
    this.context.fillStyle = particle.color;
    this.context.fillRect(particle.x, particle.y, 1, 1);
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
  add(particle: Particle) {
    this.particles.push(particle);
  }
  update(renderer: Renderer) {
    renderer.context.clearRect(0, 0, renderer.canvas.width, renderer.canvas.height);
    for (var particle of this.particles) {
      particle.newPos();
      renderer.draw(particle);
    }
  }
}

var sandbox = new Sandbox();
var renderer = new Renderer();
setInterval(() => {
  sandbox.update(renderer);
}, 10)

function draw(x:number, y:number, sandbox:Sandbox) {
  var drop = new Particle("water", x, y, "blue");
  sandbox.add(drop);
}

renderer.canvas.addEventListener('mousedown', () => {
  isDrawing = true;
});

renderer.canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    draw(e.offsetX, e.offsetY, sandbox);
  }
});

renderer.canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

