function $id(id) {
  return document.getElementById(id);
}

function newTela(id_or_element) {
  const tela = typeof id_or_element == 'string' ? $id(id_or_element) : id_or_element;
  const ctx = tela.getContext('2d');
  return {
    canvas: tela,
    ctx,
    get width()         { return tela.width },
    get height()        { return tela.height },
    get clientWidth()   { return tela.clientWidth },
    get clientHeight()  { return tela.clientHeight },
    set width(v)        { tela.width = v },
    set height(v)       { tela.height = v },
    set clientWidth(v)  { tela.clientWidth = v },
    set clientHeight(v) { tela.clientHeight = v },
  }
}

class TelasContainer {
  constructor(id) {
    this.dicionario = {}
    this.lista = Array.from($id(id).children)
      .map(canva => this.dicionario[canva.id] = newTela(canva));
  }

  get(indice_or_key) {
    return (typeof indice_or_key == 'string' ? this.dicionario : this.lista)[indice_or_key];
  }
}

function resizeTela(tela) {
  tela.width = tela.clientWidth;
  tela.height = tela.clientHeight;
}

function resizeTelas(telas) {
  telas.lista.forEach(resizeTela);
}

function limparTela(tela) {
  tela.ctx.clearRect(0, 0, tela.width, tela.height);
}

function limparTelas(telas) {
  telas.lista.forEach(limparTela);
}

//---------------- Ainda em testes... ------------------
function escurecerTela(tela, cor = '#0003') {
  tela.ctx.fillStyle = cor;
  tela.ctx.fillRect(0, 0, tela.width, tela.height);
}

function escurecerTelas(telas, cor = '#0003') {
  telas.lista.forEach(tela => escurecerTela(tela, cor));
}
//------------------------------------------------------

function autoResizeTelas(telas) {
  const controller = new AbortController();
  const signal = controller.signal;

  window.addEventListener('resize', () => resizeTelas(telas), {signal});
  resizeTelas(telas);
  
  return controller;
}

