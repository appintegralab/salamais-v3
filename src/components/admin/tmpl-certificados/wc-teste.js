console.log("wc-teste");

const template = document.createElement('template')

template.innerHTML = /*html*/`
    <style>
        .caixa { 
            border: 1px solid black;
            padding: 1px 4px 1px 4px; 
            border-radius: 5px;
        }
    </style>
    <span class="caixa">
        meu elemento        
    </span>
`

class WCTeste extends HTMLElement {
    constructor() {
        super()
        console.log("wc-teste construtor");

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}

if (!window.customElements.get('wc-teste')) {
    window.customElements.define('wc-teste', WCTeste)
}
