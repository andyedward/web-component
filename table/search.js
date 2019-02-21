class PWISearchTable extends HTMLElement {
  constructor() {
    super();
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
    <input type="text" name="search"/>
    `;

    // Attach a shadow root to <my-element>.
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    let element = shadowRoot.querySelector("input[name='search']");
    this.addListenerToInput(element)

  }

  observedAttributes() {
    return ['search'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.');
  }

  get search() {
    this.getAttribute('search');
  }
  set search(value) {
    this.setAttribute('search', value)
  }

  addListenerToInput(element) {
    element.addEventListener('keyup', e => {
      this.search = element.value;
      this.returnElementValue(element.value)
    })
  }

  returnElementValue(searchValue) {
    let event = new CustomEvent("search-value", {
      bubbles: true,
      detail: {searchValue}
    });
    this.dispatchEvent(event);
  }
}

customElements.define('pwi-search-table', PWISearchTable)