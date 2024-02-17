class Renderer {
  canvas = document.querySelector("canvas")!;
  context = this.canvas.getContext("2d")!;
  renderParticle(particle: Particle, style="solid") {
    if (style == "glowing"){
      // Could be cool to render the color differently depending on temperature!
      this.context.fillStyle = particle.color;
      this.context.shadowColor = particle.color;
      this.context.shadowBlur = 10;
      this.context.fillRect(particle.x, particle.y, 1, 1);
    }
    if (style == "gas"){
      this.context.beginPath();
      // Need a function to convert the color
      this.context.fillStyle = "rgba(255, 255, 255, 0.5)";
      this.context.arc(particle.x, particle.y, 3, 0, 2 * Math.PI);
      this.context.fill();
    }
    else {
      this.context.fillStyle = particle.color;
      this.context.fillRect(particle.x, particle.y, 1, 1);
    }
  }
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

class EventHandler {
  drawingMode = false;
  drawMode() {
    renderer.canvas.addEventListener('mousedown', () => {
      this.drawingMode = true;
    });
    renderer.canvas.addEventListener('mousemove', (e) => {
      if (this.drawingMode) {
        sandbox.createParticle(e.offsetX, e.offsetY, "sand", "gold")
      }
    });
    renderer.canvas.addEventListener('mouseup', () => {
      this.drawingMode = false;
    });
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
  clearParticle(particle: Particle){
    const index = this.particles.indexOf(particle, 0);
    if (index > -1) {
      this.particles.splice(index, 1);
    }
  }
  isOutOfBounds(particle: Particle, renderer: Renderer){
    return (particle.x < 0) || (particle.y < 0) || (particle.x > renderer.canvas.width) || (particle.y > renderer.canvas.height);
  }
  update(renderer: Renderer) {
    renderer.clear();
    for (var particle of this.particles) {
      particle.newPos();
      renderer.renderParticle(particle, "glowing");
      if (this.isOutOfBounds(particle, renderer)){
        this.clearParticle(particle);
      }
    }
  }
}

var sandbox = new Sandbox();
var renderer = new Renderer();
var events = new EventHandler();
events.drawMode();
setInterval(() => {
  sandbox.update(renderer);
}, 10)
