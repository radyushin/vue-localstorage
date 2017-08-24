'use strict';
import Vue from '../node_modules/vue/dist/vue.min';
import VueLocalStorage from '../dist/index';
import test from 'ava';

//we should use serial test because of a window object which is immutable
test.beforeEach(t => {
  window.localStorage.clear();
  t.context.VueLocalStorage = VueLocalStorage;
});

test.serial('VueLocalStorage can set item', t => {
  let storage = t.context.VueLocalStorage;
  storage.set('foo', 'boo');

  t.is(storage.get('foo'), 'boo');
});

test.serial('VueLocalStorage does not touch the items of users', t => {
  let storage = t.context.VueLocalStorage;
  window.localStorage.setItem('foo', 'userValueBoo');
  storage.set('foo', 'boo');

  t.is(storage.get('foo'), 'boo');
  t.is(window.localStorage.getItem('foo'), 'userValueBoo');

});


test.serial('VueLocalStorage can return correct length', t => {
  let storage = t.context.VueLocalStorage;
  storage.set('foo', 'boo');
  storage.set('boo', 'foo');

  t.is(storage.length, 2);
});

//we should use serial test because of a window object which is immutable
test.serial('VueLocalStorage can recive different types sych as string, number, object, array', t => {
  let storage = t.context.VueLocalStorage;
  storage.set('foo', 'boo');
  storage.set('boo', 23);
  storage.set('woo', { foo: 'boo' });
  storage.set('hoo', [1, 'foo']);

  t.is(storage.get('foo'), 'boo');
  t.is(storage.get('boo'), 23);
  t.deepEqual(storage.get('woo'), { foo: 'boo' });
  t.deepEqual(storage.get('hoo'), [1, 'foo']);
});

test.serial('VueLocalStorage can return item', t => {
  let storage = t.context.VueLocalStorage;
  storage.set('foo', 'boo');

  t.is(storage.get('foo'), 'boo');
});

test.serial('VueLocalStorage can remove item', t => {
  let storage = t.context.VueLocalStorage;
  storage.set('foo', 'boo');
  storage.remove('foo', 'boo');

  t.is(storage.get('foo'), null);
});

test.serial('Item of VueLocalStorage may be expire', t => {
    let storage = t.context.VueLocalStorage;

    storage.set('foo', 'boo', 0);
    storage.set('boo', 'foo', 1);

    setTimeout(() => {
      storage.clear();

      t.is(storage.get('foo'), 'boo');
      t.is(storage.get('boo'), null);
    }, 2000);
});

test.serial('VueLocalStorage can be called from Vue instamce', t => {
  Vue.use(t.context.VueLocalStorage);
  Vue.localStorage.set('foo', 'bar');
  t.is(Vue.localStorage.get('foo'), 'bar');
});