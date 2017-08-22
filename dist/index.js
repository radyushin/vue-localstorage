'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VueLocalStorage = function () {
  function VueLocalStorage() {
    var _this = this;

    _classCallCheck(this, VueLocalStorage);

    this.storage = _storage2.default;

    Object.defineProperty(this, "length", {
      get: function get() {
        return this.storage.length;
      }
    });

    var clear = function clear() {
      if (_this.length === 0) {
        return;
      }

      for (var i = 0; i < _this.length; i++) {
        var key = _this.storage.key(i);

        if (false === /vuels__/i.test(key)) {
          continue;
        }

        var current = JSON.parse(_this.storage.getItem(key));

        if (current.expire > 0 && current.expire < new Date().getTime()) {
          _this.storage.removeItem(key);
        }
      }
    };
    clear();
  }

  _createClass(VueLocalStorage, [{
    key: 'install',
    value: function install(Vue) {
      Vue.localStorage = Vue.prototype.$localStorage = this;
    }
  }, {
    key: 'set',
    value: function set(name, value) {
      var expire = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      this.storage.setItem('vuels__' + name, JSON.stringify({ value: value, expire: expire > 0 ? new Date().getTime() + expire : expire }));
    }
  }, {
    key: 'get',
    value: function get(name) {
      var item = this.storage.getItem('vuels__' + name);
      if (null !== item) return JSON.parse(item).value;
      return null;
    }
  }, {
    key: 'remove',
    value: function remove(name) {
      return this.storage.removeItem('vuels__' + name);
    }
  }, {
    key: 'key',
    value: function key(index) {
      return this.storage.key(index);
    }
  }]);

  return VueLocalStorage;
}();

if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
  module.exports = new VueLocalStorage();
} else if (window && window.Vue) {
  window.Vue.use(new VueLocalStorage());
}