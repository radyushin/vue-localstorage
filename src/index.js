export default class VueLocalStorage {
    constructor () {
        this.storage = window.localStorage;

        Object.defineProperty(this, "length", {
            get() { return this.storage.length; }
        });

        let clear = () => {
            if (this.length == 0) return;
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

    set (name, value, expire = 0) {
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
    key(index) {
        return this.storage.key(index);
    }
}

if (window.Vue) {
    window.Vue.use(new VueLocalStorage);
}
