'use strict';
import test from 'ava';
import VueLocalStorage from '../dist/index';

test.beforeEach(t => {
    t.context.VueLocalStorage = new VueLocalStorage();
});

test('VueLocalStorage can add item', t => {
    let storage = t.context.VueLocalStorage;
    storage.add('foo', 'boo');

    t.is(storage.get('foo'), 'boo');
});

test('VueLocalStorage can return item', t => {
    let storage = t.context.VueLocalStorage;
    storage.add('foo', 'boo');

    t.is(storage.get('foo'), 'boo');
});

test('VueLocalStorage can remove item', t => {
    let storage = t.context.VueLocalStorage;
    storage.add('foo', 'boo');
    storage.remove('foo', 'boo');

    t.is(storage.get('foo'), null);
});

test('VueLocalStorage can return correct length', t => {
    let storage = t.context.VueLocalStorage;
    storage.add('foo', 'boo');
    storage.add('boo', 'foo');

    t.is(storage.length, 2);
});