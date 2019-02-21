"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PWITable =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(PWITable, _HTMLElement);

    function PWITable() {
      var _this;

      _classCallCheck(this, PWITable);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(PWITable).call(this));

      var headerCode = _this.createHeader();

      var tableBodyCode = _this.createTableData();

      var tmpl = document.createElement('template');
      tmpl.innerHTML = "\n    <style>\n    table {\n        border-collapse: collapse;\n        text-align: center;\n    }\n    table th,table tr, table tr td  {\n        border: 1px solid #000;\n        padding: 8px;\n    }\n    \n    table tr td:first-child {\n        color: #20aeff;\n    }\n    </style>\n    <table>\n        ".concat(headerCode, "\n        <tbody>\n            ").concat(tableBodyCode, "\n        </tbody>\n    </table>");

      var shadowRoot = _this.attachShadow({
        mode: 'open'
      });

      shadowRoot.appendChild(tmpl.content.cloneNode(true)); // this.listenToSearchEvent();

      return _this;
    }

    _createClass(PWITable, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'config') {
          this.shadowRoot.querySelector("table tbody:first-child tr").innerHTML = this.createHeader(this.config);
        }

        if (name === 'data') {
          this.shadowRoot.querySelector("table tbody:nth-child(2)").innerHTML = this.createTableData(this.data);
        }
      }
    }, {
      key: "createHeader",
      value: function createHeader(config) {
        var headerText = '';
        var headerArray = this.setDefaultHeader();

        if (config) {
          var headerColumns = typeof config == 'string' ? JSON.parse(config) : config;

          if (headerColumns && headerColumns.columns && headerColumns.columns !== "") {
            headerArray = headerColumns.columns;
          }
        }

        if (Array.isArray(headerArray)) {
          headerArray.forEach(function (colName) {
            headerText += "<th>".concat(colName, "</th>");
          });
        }

        return headerText;
      }
    }, {
      key: "setDefaultHeader",
      value: function setDefaultHeader() {
        return ["P&ID Tag", "Site", "Unit", "Location", "Date/ Time", "Current Status", "Alert", "Criticality"];
      }
    }, {
      key: "createTableData",
      value: function createTableData(data) {
        var defaultTableData = this.setDefaultBody();
        var tableDatas = defaultTableData.data;

        if (data && data !== "") {
          tableDatas = typeof data == 'string' ? JSON.parse(data).data : data.data;
        }

        return this.createRow(tableDatas);
      }
    }, {
      key: "setDefaultBody",
      value: function setDefaultBody() {
        var bodyObj = {
          "data": [{
            "col1": "PV 101",
            "col2": "Deer Park",
            "col3": "Utilities",
            "col4": "",
            "col5": "December 11th 2018, 11:28 PM",
            "col6": "Normal",
            "col7": "More Status Available",
            "col8": "1"
          }]
        };
        return bodyObj;
      }
    }, {
      key: "createRow",
      value: function createRow(tableDatas) {
        var _this2 = this;

        var tableData = '';

        if (Array.isArray(tableDatas)) {
          tableDatas.forEach(function (row) {
            var rowText = _this2.transformRowObjectToMarkup(row);

            tableData += "<tr>".concat(rowText, "</tr>");
          });
        }

        return tableData;
      }
    }, {
      key: "transformRowObjectToMarkup",
      value: function transformRowObjectToMarkup(rowObj) {
        var htmlString = '';

        for (var value in rowObj) {
          htmlString += "<td>".concat(rowObj[value], "</td>");
        }

        return htmlString;
      } // listenToSearchEvent() {
      //   window.addEventListener('search-value', e => {
      //     console.log('inside table', e)
      //     let element = this.shadowRoot.querySelector("table tr td:first-child");
      //     element.innerText = e.detail.searchValue;
      //   })
      // }

    }, {
      key: "config",
      get: function get() {
        return this.getAttribute('config');
      },
      set: function set(newConfig) {
        this.setAttribute('config', newConfig);
      }
    }, {
      key: "data",
      get: function get() {
        return this.getAttribute('data');
      },
      set: function set(newConfig) {
        this.setAttribute('data', newConfig);
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['config', 'data'];
      }
    }]);

    return PWITable;
  }(_wrapNativeSuper(HTMLElement));

customElements.define('pwi-table', PWITable);