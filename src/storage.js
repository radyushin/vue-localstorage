import cookie from './cookie';

let storage;

const isLocalStorageAvailable = () => {
  try {
    const randomKey = 'testvuels';
    window.localStorage.setItem(randomKey, '1');
    window.localStorage.removeItem(randomKey);

    return true;
  } catch (error) {
    return false;
  }
};

if (isLocalStorageAvailable()) {
  storage = window.localStorage;
} else {
  storage = cookie;
}

export default storage;
