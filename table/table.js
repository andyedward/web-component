class PWITable extends HTMLElement {
  static get observedAttributes() {
    return ['config', 'data'];
  }
  constructor() {
    super();
    let headerCode = this.getHeaderMarkup();
    let tableBodyCode = this.getTableDataMarkup();
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
    <table id="table">
        ${headerCode}
        <tbody>
            ${tableBodyCode}
        </tbody>
    </table>`;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this.sortAscending = true;

    this.listenToUserPushDataEvent();
    this.listenToSearchEvent();
    this.listenToResetEvent();

    this.listenToClickEventOnTable();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'config') {
      this.shadowRoot.querySelector("table tbody:first-child tr").innerHTML = this.getHeaderMarkup(this.config)
    }
    if (name === 'data') {
      this.shadowRoot.querySelector("table tbody:nth-child(2)").innerHTML = this.getTableDataMarkup(this.data)
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

  listenToClickEventOnTable() {
    this.shadowRoot.addEventListener('click', e => {
      console.log(e);
      if (e.path[2].nodeName === 'TH') {
        let re = /col(\w)/;
        let className = e.path[1].className;
        let columnIndex = className.replace(re, '$1');
        this.sortColumn(columnIndex)

      }
    }, true)
  }

  getHeaderMarkup(config) {
    let headerText = '';
    let headerArray = this.setDefaultHeader();
    if (config) {
      let headerColumns = (typeof config == 'string' ? JSON.parse(config) : config);
      if (headerColumns && headerColumns.columns && headerColumns.columns !== "") {
        headerArray = headerColumns.columns;
      }
    }
    if (Array.isArray(headerArray)) {
      let columnIndex = 0
      headerArray.forEach((colName) => {
        columnIndex++;
        headerText +=`
            <th>${colName} 
                <span class="col${columnIndex}" >
                    <small>(sort me)</small>
                </span>
            </th>`
      })
    }
    return headerText;
  }

  setDefaultHeader() {
    return ["P&ID Tag","Site","Unit","Location","Date/ Time","Current Status","Alert","Criticality"];
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

  listenToUserPushDataEvent() {
    window.addEventListener('user-push-data', e => {
      console.log('receive user push data', e.detail)

      this.originalData = e.detail;
      this.shadowRoot.querySelector("table tbody:nth-child(2)").innerHTML = this.getTableDataMarkup(e.detail)
    })
  }

  getTableDataMarkup(data) {
    let defaultTableData = this.setDefaultBody();
    let tableDatas = defaultTableData.data;

    if(data && data !== "") {
      tableDatas = (typeof data == 'string' ? JSON.parse(data).data : data.data);
    }
    return this.getTableRowMarkup(tableDatas);
  }

  getTableRowMarkup(tableDatas) {
    let tableData = '';
    if (Array.isArray(tableDatas)) {
      tableDatas.forEach((row) => {
        let rowText  = this.getTableCellMarkup(row);
        tableData +=`<tr>${rowText}</tr>`
      })
    }
    return tableData;
  }

  getTableCellMarkup(rowObj) {
    let htmlString = '';
    for (let value in rowObj) {
      htmlString += `<td>${rowObj[value]}</td>`;
    }
    return htmlString;
  }

  listenToSearchEvent() {
    window.addEventListener('search-value', e => {
      let element = this.shadowRoot.querySelector("table tr td:first-child");
      if (element) {
        element.innerText = e.detail.searchValue;
      }
      this.searchAndSetData(e.detail.searchValue);
    })
  }

  searchAndSetData(searchText) {
    // let existingDataArray = JSON.parse(this.data).data;
    let existingDataArray = this.originalData.data;

    let newDataArray = existingDataArray.filter((rowObj) => {
      return Object.keys(rowObj).some(function(key) {
        return rowObj[key].includes(searchText);
      })
    });

    console.log(newDataArray);

    this.data = JSON.stringify({data: newDataArray})
  }

  listenToResetEvent() {
    window.addEventListener('user-reset', e => {
      this.resetArray()
    })
  }

  resetArray() {
    if (this.originalData) this.data = JSON.stringify(this.originalData);
  }

  sortColumn(columnIndex) {
    let existingDataArray = this.originalData.data;
    let byColumn = existingDataArray.slice(0);
    if (this.sortAscending){
      byColumn = this.reverseSorting(byColumn, columnIndex)
    } else {
      byColumn = this.ascendingSorting(byColumn, columnIndex)
    }
    this.data = JSON.stringify({data: byColumn})

  }

  reverseSorting(dataArray, columnIndex) {
    dataArray.sort(function(a,b) {
      var nameA = a["col" + columnIndex].toUpperCase(); // ignore upper and lowercase
      var nameB = b["col" + columnIndex].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }

      // names must be equal
      return 0;
    });
    this.sortAscending = !this.sortAscending;
    return dataArray;
  }

  ascendingSorting(dataArray, columnIndex) {
    dataArray.sort(function(a,b) {
      var nameA = a["col" + columnIndex].toUpperCase(); // ignore upper and lowercase
      var nameB = b["col" + columnIndex].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    this.sortAscending = !this.sortAscending;
    return dataArray;
  }

}

customElements.define('pwi-table', PWITable)