const initialState = new Array(3).fill(0).map((_, index) => ({
  name: `User ${index + 1}`
}));

const addUser = (state, payload) => [...state, payload];

const effects = {
  ADD_USER: addUser
};

export default {
  initialState,
  effects
};
