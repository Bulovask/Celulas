const telas = new TelasContainer('telas');
const resizeTelasController = autoResizeTelas(telas);

let particulas = [];

let width = telas.get(0).width;
const height = telas.get(0).height;


for(let i = 0; i < 5000; i++) {
  const x = Math.random() * (width-10) + 10;
  const y = Math.random() * (height / 2);
  particulas.push(new Rubrum(x, y, 0, 1))
  particulas.push(new Caeruleum(x-10, y-10, 0, 1))
}

atrito = 1;
atrito = (x, y) => (Math.sin(x/100 + y/100) + 1) / 4;

function loop_game() {
  // limparTelas(telas);
  const r = Math.trunc(Math.random() * 3);
  const g = Math.trunc(Math.random() * 3);
  const b = Math.trunc(Math.random() * 3);
  const a = Math.trunc(Math.random() * 3);

  escurecerTela(telas.get('particulas'), `#${r}${g}${b}${a}`);
  particulas.forEach(p => {
    if(!p._sentido) p._sentido = 0.01;
    p.vy += 0.01; p.vx += p._sentido; 
    if(p.x < 0 || p.x > width - 10) {
      p._sentido *= -1
      p.vx *= -1;
    };
    if(p.y > height) p.y = -10;
  });
  particulas.forEach(particula => particula.update(atrito));
  particulas.forEach(particula => particula.draw(telas.get('particulas').ctx));

  requestAnimationFrame(loop_game);
}

telas.get(1).canvas.addEventListener('mousemove', (e => {
  particulas.forEach(p => {
    const left = e.clientX - 50;
    const right = e.clientX + 50;
    const top = e.clientY - 50;
    const bottom = e.clientY + 50;

    if(p.x < right && p.x > left && p.y > top && p.y < bottom) {
      p.vy = -100;
    }
  });
}), false);

telas.get(1).canvas.addEventListener('click', () => particulas.forEach(p => {
  p.vy=0
  p.vx=0
}), false);

loop_game()