const initialState = {currentUser: null, isLoged: false};
const user = (state = initialState, action) => {
  console.log('action.payload', action.payload);

  switch (action.type) {
    case 'LOGIN': {
      return [...state, action.payload];
    }
    case 'LOGOUT': {
      return [...state, {currentUser: null, isLoged: false}];
    }
  }
  return state;
};
export default user;
