const telas = new TelasContainer('telas');

let x = 7;
let y = 0;
let vx = 1;
let vy = 1;

function loop_game() {

  x += vx;
  y += vy;

  if(x > 500 || x < 0) vx *= -1;
  if(y > 500 || y < 0) vy *= -1

  limparTelas(telas);
  telas.get('celulas').ctx.fillStyle = "#f00";
  telas.get('celulas').ctx.fillRect(x, y, 30, 30);
  telas.get('celulas').ctx.fillRect(65, 55, 30, 30);

  telas.get('particulas').ctx.fillStyle = "#00f";
  telas.get('particulas').ctx.fillRect(500 - x, 500 - y, 30, 30);
  telas.get('particulas').ctx.fillRect(50, 40, 30, 30);

  requestAnimationFrame(loop_game);
}

const resizeTelasController = autoResizeTelas(telas);
loop_game()