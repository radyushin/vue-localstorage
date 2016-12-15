export default class VueLocalStorage {
    constructor () {
        this.storage = window.localStorage;

        Object.defineProperty(this, "length", {
            get() { return this.storage.length; }
        });

        let clear = () => {
            for (let i = 0; i < this.length; i++) {
                let current = JSON.parse(this.storage.getItem(this.storage.key(i)));
                if (current.expire > 0 && current.expire < new Date().getTime()) {
                    this.remove(this.storage.key(i));
                }
            }
        };
        clear();
    }
    install (Vue) {
        let _this = this;
        Object.defineProperty(Vue.prototype, "$localStorage", {
            get() {
                return _this;
            }
        });
    }

    add (name, value, expire = 0) {
        this.storage.setItem(
            name,
            JSON.stringify({value:value, expire:expire > 0 ? new Date().getTime() + expire : expire})
        );
    }
    get (name) {
        let item = this.storage.getItem(name);
        if (null != item) return JSON.parse(item).value;
        return null;
    }
    remove (name) {
        return this.storage.removeItem(name);
    }
    key() {

    }
}

if (window.Vue) {
    window.Vue.use(new VueLocalStorage);
}
