const initialState = new Array(3).fill(0).map((_, index) => ({
  id: index + 1,
  name: `Vlad ${index + 1}`
}));

const addUser = (state, payload) => [...state, payload];

const effects = {
  ADD_USER: addUser
};

export default {
  initialState,
  effects
};
