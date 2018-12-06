export const initialState = {
  users: new Array(3).fill(0).map((_, index) => ({
    id: index + 1,
    name: `Vlad ${index + 1}`
  })),
  cnJokes: []
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, payload]
      };

    case 'SET_CN_JOKES':
      return {
        ...state,
        cnJokes: payload
      };

    default:
      return state;
  }
};
