'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cookie = require('./cookie');

var _cookie2 = _interopRequireDefault(_cookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = void 0;

var isLocalStorageAvailable = function isLocalStorageAvailable() {
  try {
    var randomKey = 'testvuels';
    window.localStorage.setItem(randomKey, '1');
    window.localStorage.removeItem(randomKey);

    return true;
  } catch (error) {
    return false;
  }
};

if (isLocalStorageAvailable()) {
  storage = window.localStorage;
} else {
  storage = _cookie2.default;
}

exports.default = storage;