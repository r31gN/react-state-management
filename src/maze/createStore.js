const createStore = (initialStore = {}) => {
  const store = initialStore;

  return {
    set(key, value) {
      store[key] = value;
    },
    get() {
      return store;
    }
  };
};

export default createStore;
