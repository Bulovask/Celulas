class Particula {
  constructor(x, y, r, cor, type, vx = 0, vy = 0) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.type = type;
    this.cor = cor;
    this.r = r;
    this.destruir = false;
  }

  draw(ctx) {
    ctx.fillStyle = this.cor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 6.28);
    ctx.fill();
  }

  update(atrito_or_funcAtrito = 0.01 ) {
    this.x += this.vx;
    this.y += this.vy;

    const atrito = typeof atrito_or_funcAtrito == 'function' ? atrito_or_funcAtrito(this.x, this.y) : atrito_or_funcAtrito;

    const cm = (141 * atrito + Math.sqrt(19877 * atrito ** 2 - 40612 * atrito + 20736) - 142) / 2

    this.vx *= cm;
    this.vy *= cm;

    if(this.vx > 3) this.vx = 3;
    else if(this.vx < -3) this.vx = -3;
    if(this.vy > 3) this.vy = 3;
    else if(this.vy < -3) this.vy = -3;
  }
}

class Rubrum extends Particula {
  constructor(x, y, vx, vy) {
    super(x, y, 3, '#a33', 1, vx, vy)
  }
}

class Caeruleum extends Particula {
  constructor(x, y, vx, vy) {
    super(x, y, 3, '#33a', 2, vx, vy)
  }
}
