export default class VueLocalStorage {
    constructor () {
        this.storage = window.localStorage;
    }
    install (Vue) {
        let _this = this;
        Object.defineProperty(Vue.prototype, "$localStorage", {
            get() {
                return _this;
            }
        });
    }
    add (name, value) {
        this.storage.setItem(name, value)
    }
}

if (window.Vue) {
    window.Vue.use(new VueLocalStorage)
}