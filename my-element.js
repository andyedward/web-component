class MyElement extends HTMLElement {
    constructor() {
        super();
        let tmpl = document.createElement('template');
        tmpl.innerHTML = `
            <slot name="header"></slot>
            <slot name="middle"></slot>
            <slot name="footer"></slot>
            Look Here => <span></span>
        `;

        // Attach a shadow root to <my-element>.
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(tmpl.content.cloneNode(true));

        this.addEventListener('click', this._onClick);
        this.displayVal = this.shadowRoot.querySelector('span');

        this.middleSlot = this.shadowRoot.querySelector('slot[name=middle]');
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
                console.log(this.config);
                this.names = JSON.parse(this.config);
                this.nameList=[];
                for (let name in this.names ) {
                    this.nameList.push(this.names[name]);
                }
                this.displayVal.innerText = this.nameList.join(",");
                this.middleSlot.assignedNodes()[0].innerText = this.nameList.join(",");
                console.log(this.middleSlot.assignedNodes()[0].innerText);

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