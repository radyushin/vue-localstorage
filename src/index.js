export default class VueLocalStorage {
    constructor () {
        this.storage = window.localStorage;

        Object.defineProperty(this, "length", {
            get() { return this.storage.length; }
        });

        let clear = () => {
            if (this.length == 0) return;
            for (let i = 0; i < this.length; i++) {
                let key = this.storage.key(i);
                if (false == /vuels__/i.test(key)) continue;
                let current = JSON.parse(this.storage.getItem(key));
                 if (current.expire > 0 && current.expire < new Date().getTime()) {
                     this.storage.removeItem(key);
                }
            }
        };
        clear();
    }
    install (Vue) {
        let _this = this;
        Vue.localStorage = _this;
        Object.defineProperty(Vue.prototype, "$localStorage", {
            get() {
                return _this;
            }
        });
    }

    set (name, value, expire = 0) {
        this.storage.setItem(
            'vuels__' + name,
            JSON.stringify({value:value, expire:expire > 0 ? new Date().getTime() + expire : expire})
        );
    }
    get (name) {
        let item = this.storage.getItem('vuels__' + name);
        if (null != item) return JSON.parse(item).value;
        return null;
    }
    remove (name) {
        return this.storage.removeItem('vuels__' + name);
    }
    key(index) {
        return this.storage.key(index);
    }
}

if (window.Vue) {
    window.Vue.use(new VueLocalStorage);
}
