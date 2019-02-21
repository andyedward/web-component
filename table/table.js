class PWITable extends HTMLElement {
  constructor() {
    super();
    let headerCode = this.createHeader();
    let tableBodyCode = this.createTableData();
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
    <style>
    table {
        border-collapse: collapse;
        text-align: center;
    }
    table th,table tr, table tr td  {
        border: 1px solid #000;
        padding: 8px;
    }
    
    table tr td:first-child {
        color: #20aeff;
    }
    </style>
    <table>
        ${headerCode}
        <tbody>
            ${tableBodyCode}
        </tbody>
    </table>`;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    // this.listenToSearchEvent();
  }

  static get observedAttributes() {
    return ['config', 'data'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'config') {
      this.shadowRoot.querySelector("table tbody:first-child tr").innerHTML = this.createHeader(this.config)
    }
    if (name === 'data') {
      this.shadowRoot.querySelector("table tbody:nth-child(2)").innerHTML = this.createTableData(this.data)
    }
  }

  get config() {
    return this.getAttribute('config');
  }

  set config(newConfig) {
    this.setAttribute('config', newConfig);
  }

  get data() {
    return this.getAttribute('data');
  }

  set data(newConfig) {
    this.setAttribute('data', newConfig);
  }

  createHeader(config) {
    let headerText = '';
    let headerArray = this.setDefaultHeader();
    if (config) {
      let headerColumns = (typeof config == 'string' ? JSON.parse(config) : config);
      if (headerColumns && headerColumns.columns && headerColumns.columns !== "") {
        headerArray = headerColumns.columns;
      }
    }
    if (Array.isArray(headerArray)) {
      headerArray.forEach((colName) => {
        headerText +=`<th>${colName}</th>`
      })
    }
    return headerText;
  }

  setDefaultHeader() {
    return ["P&ID Tag","Site","Unit","Location","Date/ Time","Current Status","Alert","Criticality"];
  }

  createTableData(data) {
    let defaultTableData = this.setDefaultBody();
    let tableDatas = defaultTableData.data;

    if(data && data !== "") {
      tableDatas = (typeof data == 'string' ? JSON.parse(data).data : data.data);
    }
    return this.createRow(tableDatas);
  }

  setDefaultBody() {
    let bodyObj = {
      "data": [
        {
          "col1": "PV 101",
          "col2": "Deer Park",
          "col3": "Utilities",
          "col4": "",
          "col5": "December 11th 2018, 11:28 PM",
          "col6": "Normal",
          "col7": "More Status Available",
          "col8": "1"
        }
      ]
    };
    return bodyObj;
  }

  createRow(tableDatas) {
    let tableData = '';
    if (Array.isArray(tableDatas)) {
      tableDatas.forEach((row) => {
        let rowText  = this.transformRowObjectToMarkup(row);
        tableData +=`<tr>${rowText}</tr>`
      })
    }
    return tableData;
  }

  transformRowObjectToMarkup(rowObj) {
    let htmlString = '';
    for (let value in rowObj) {
      htmlString += `<td>${rowObj[value]}</td>`;
    }
    return htmlString;
  }

  // listenToSearchEvent() {
  //   window.addEventListener('search-value', e => {
  //     console.log('inside table', e)
  //     let element = this.shadowRoot.querySelector("table tr td:first-child");
  //     element.innerText = e.detail.searchValue;
  //   })
  // }
}

customElements.define('pwi-table', PWITable)