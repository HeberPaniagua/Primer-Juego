var modal = document.getElementById('modal');
const azul = document.getElementById('azul');
const morado = document.getElementById('morado');
const verde = document.getElementById('verde');
const naranja = document.getElementById('naranja');
const ULTIMO_NIVEL = 10;

class Juego {
  constructor() {
    setTimeout(() => {
      this.inicio();
      this.obtenerSecuencia();
      this.siguienteNivel()
    }, 0)
  }

  inicio() {
    this.colorEligido = this.colorEligido.bind(this)
    this.nivel = 1;
    this.colores = {
      azul,
      morado,
      naranja,
      verde
    }
  }

  obtenerSecuencia () {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map((n) => Math.floor(Math.random() * 4));
  }
  siguienteNivel() {
    setTimeout(() => {
      this.subnivel = 0
      this.iluminarSecuencia()
      this.obtenerClick()
    }, 1000)
  }
  deNumeroColor (numero) {
    switch (numero) {
      case 0:
        return 'azul'
      case 1:
        return 'verde'
      case 2:
        return 'naranja'
      case 3:
        return 'morado'
    }
  }
  deColoraNumero (color) {
    switch (color) {
      case 'azul':
        return 0
      case 'verde':
        return 1
      case 'naranja':
        return 2
      case 'morado':
        return 3
    }
  }
  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const colorsito = this.deNumeroColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(colorsito), 1000 * i)
    }
  }
  iluminarColor (colorsito) {
    this.colores[colorsito].classList.add('light')
    setTimeout(() => this.apagarColor(colorsito), 350)
  };
  apagarColor (col) {
    this.colores[col].classList.remove('light')
  }
  obtenerClick () {
    this.colores.azul.addEventListener('click', this.colorEligido)
    this.colores.naranja.addEventListener('click', this.colorEligido)
    this.colores.morado.addEventListener('click', this.colorEligido)
    this.colores.verde.addEventListener('click', this.colorEligido)
  }
  eliminarEventoClick() {
    this.colores.azul.removeEventListener('click', this.colorEligido)
    this.colores.naranja.removeEventListener('click', this.colorEligido)
    this.colores.morado.removeEventListener('click', this.colorEligido)
    this.colores.verde.removeEventListener('click', this.colorEligido)
  }
  colorEligido (ev) {
    const nombrecolor = ev.target.dataset.color
    const numeroColor = this.deColoraNumero(nombrecolor)
    this.iluminarColor(nombrecolor)
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        this.eliminarEventoClick();
        if (this.nivel === (ULTIMO_NIVEL + 1)) {
          this.reinicioBueno()
        } else {
          setTimeout(this.siguienteNivel(), 2000);
        }
      }
    } else {
      this.reinicioMalo()
    }
  }
  reinicioBueno() {
    setTimeout(() => {
      swal('Grupo Paniagua', 'Felicitaciones, Ganaste el juego!!', 'success')
      .then(() => {
        this.inicio()
        setTimeout(() => {
          modal.classList.remove('mol')
        }, 500)
      })
    }, 500)
  }

  reinicioMalo() {
    swal('Grupo Paniagua', 'Looosserrr!!', 'error')
    .then(() => {
      this.eliminarEventoClick()
      setTimeout(() => {
        modal.classList.remove('mol')
      }, 500)
      this.inicio()
    })
  }
}

modal.addEventListener('click', empezarJuego, true);

function empezarJuego () {
  modal.classList.add('mol') 
  window.jugar = new Juego()
}