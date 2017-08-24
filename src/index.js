import storage from './storage';

class VueLocalStorage {
  constructor() {
    this.storage = storage;
    this.clear();
  }

  install(Vue) {
    Vue.localStorage = Vue.prototype.$localStorage = this;
  }

  set(name, value, expire = 0) {
    const keyName = 'vuels__' + name;
    const data = JSON.stringify({ value: value, expire: expire > 0 ? new Date().getTime() + expire : expire });

    if (typeof this.storage.type !== 'undefined' && this.storage.type === 'cookie') {
      this.storage.setItem(keyName, data, expire);
    } else {
      this.storage.setItem(keyName, data);
    }
  }

  get(name) {
    let item = this.storage.getItem('vuels__' + name);
    if (null !== item) return JSON.parse(item).value;
    return null;
  }

  remove(name) {
    return this.storage.removeItem('vuels__' + name);
  }

  key(index) {
    return this.storage.key(index);
  }

  /**
   * Removes expired items
   */
  clear() {
    if (this.length === 0) {
      return;
    }

    for (let i = 0; i < this.length; i++) {
      const key = this.storage.key(i);

      if (false === /vuels__/i.test(key)) {
        continue;
      }

      const current = JSON.parse(this.storage.getItem(key));

      if (current.expire > 0 && current.expire < new Date().getTime()) {
        this.storage.removeItem(key);
      }
    }
  };

  get length() {
    return this.storage.length;
  }
}

if (typeof exports === 'object') {
  module.exports = new VueLocalStorage();
} else if (window && window.Vue) {
  window.Vue.use(new VueLocalStorage());
}
