'use strict';
import test from 'ava';
import VueLocalStorage from '../dist/vue-localstorage';

test.beforeEach(t => {
    t.context.VueLocalStorage = new VueLocalStorage();
});

test('VueLocalStorage can set item', t => {
    let storage = t.context.VueLocalStorage;
    storage.set('foo', 'boo');

    t.is(storage.get('foo'), 'boo');
});

//we should use serial test because of a window object which is immutable
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
    storage.set('woo', {foo: 'boo'});
    storage.set('hoo', [1,'foo']);

    t.is(storage.get('foo'), 'boo');
    t.is(storage.get('boo'), 23);
    t.deepEqual(storage.get('woo'), {foo: 'boo'});
    t.deepEqual(storage.get('hoo'), [1,'foo']);
});

test('VueLocalStorage can return item', t => {
    let storage = t.context.VueLocalStorage;
    storage.set('foo', 'boo');

    t.is(storage.get('foo'), 'boo');
});

test('VueLocalStorage can remove item', t => {
    let storage = t.context.VueLocalStorage;
    storage.set('foo', 'boo');
    storage.remove('foo', 'boo');

    t.is(storage.get('foo'), null);
});

test('Item of VueLocalStorage may be expire', t => {
    return new Promise(resolve => {
        let storage = t.context.VueLocalStorage;
        storage.set('foo','boo', 0);
        storage.set('boo','foo', 1);
        setTimeout(() => {
            resolve(new VueLocalStorage());
        }, 100);
    }).then(storage => {
        t.is(storage.get('foo'), 'boo');
        t.is(storage.get('boo'), null);
    });
});