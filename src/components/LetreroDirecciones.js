class LetreroDirecciones extends HTMLElement {
  constructor() {
    super();
    // Crear Shadow DOM
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  // Getter para obtener los atributos
  get titulo() { return this.getAttribute('titulo') ?? 'UCR'; }
  
  get filas() {
    const filasAttr = this.getAttribute('filas');
    if (!filasAttr) {
      return ['Aula 1', 'Aula 2', 'Aula 3'];
    }
    
    try {
      return JSON.parse(filasAttr);
    } catch (error) {
      console.error('Error al parsear las filas:', error);
      return ['Aula 1', 'Aula 2', 'Aula 3'];
    }
  }

  render() {
    const filasHTML = this.filas.map(fila => `
      <div class="letrero-fila">
        <span>${fila}</span>
        <span class="flecha">→</span>
      </div>
    `).join('');

    this.shadowRoot.innerHTML = /* html */`
      <style>
        :host {
          width: 320px;
          background-color: #1a3a5c;
          border-radius: 6px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 40px rgba(0,0,0,0.35);
          align-self: center;
        }

        .letrero-fila {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          color: #fff;
          gap: 12px;
        }

        .letrero-fila:last-of-type {
          border-bottom: none;
        }

        .flecha {
          font-size: 1.3rem;
          color: #fff;
          flex-shrink: 0;
        }

        .letrero-logo {
          background-color: #0f2540;
          text-align: center;
          padding: 12px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 1.4rem;
          color: #fff;
          letter-spacing: 2px;
        }
      </style>

      ${filasHTML}
      
      <div class="letrero-logo">${this.titulo}</div>
    `;
  }
}

// Registrar el componente
customElements.define('letrero-direcciones', LetreroDirecciones);