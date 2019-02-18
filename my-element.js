class MyElement extends HTMLElement {
    constructor() {
        super();
        // Attach a shadow root to <my-element>.
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <slot name="slot1"></slot>
        <slot name="slot2"></slot> 
        <span></span>   
        `;
        this.addEventListener('click', this._onClick);
        this.displayVal = this.shadowRoot.querySelector('span');
    }
    
    connectedCallback() {
        console.log('Connected');
    }
    disconnectedCallback() {
        this.removeEventListener('click', this._onClick);
    }

    get config() {
        return this.getAttribute('config');
    }

    set config(newConfig) {
        this.setAttribute('config', newConfig);
    }

    static get observedAttributes() {
        return ['config'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'config':
                this.displayVal.innerText = this.config;
                this.obj = JSON.parse(this.config);

                console.log(this.obj)
                console.log(`Value changed from ${oldValue} to ${newValue}`);
                break;
            case 'max':
                console.log(`You won't max-out any time soon, with ${newValue}!`);
                break;
        }
    }

    _onClick(event) {
            alert('inside webcomponent')
    }
}

customElements.define('my-element', MyElement);