# vue-localstorage

> The Vue plugin for work with LocalStorage from Vue context, with cookie fallback.

### Introduction

`vue-localstorage` is wrapper for work with the Storage interface of the Web Storage API.

If localStorage is not available, such as in Safari Incognito mode, then cookie will be used.

Notice that max cookie size is around 4kb.

### Development Setup

``` bash
# install deps
yarn install

# build dist files
yarn compile

# run tests
yarn run test
```

## Usage

This is looks like work with the Web Storage API.

``` js
    new Vue({
        el: '#app',
        mounted: function() {
            this.$localStorage.set('foo', 'boo');
            // also, you can set expire for item
            this.$localStorage.set('foo', 'boo', 60 * 60 * 1000); // set an expiry of item at 1 hour
            this.$localStorage.set('foo', 'boo', 0); // endless item
            this.$localStorage.get('foo'); // get foo value
            this.$localStorage.remove('foo');
        }
    });
```

## Donation

If this project help you reduce time to develop, you can give me a cup of coffee :)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Z3UX6R7EES5BC)
