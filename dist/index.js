(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.VueLocalStorage = factory());
}(this, (function () { 'use strict';

var VueLocalStorage = function VueLocalStorage () {
    this.storage = window.localStorage;
};
VueLocalStorage.prototype.install = function install (Vue) {
    var _this = this;
    Object.defineProperty(Vue.prototype, "$localStorage", {
        get: function get() {
            return _this;
        }
    });
};
VueLocalStorage.prototype.add = function add (name, value) {
    this.storage.setItem(name, value);
};

if (window.Vue) {
    window.Vue.use(new VueLocalStorage);
}

return VueLocalStorage;

})));
