const initialState = [];
const cartItems = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART':
      const newCart = action.payload;
      const cartIndex = state.findIndex(item => item._id === newCart._id);
      if (cartIndex >= 0) {
        const newState = [...state];
        const productIndex = newState[cartIndex].listProduct.findIndex(
          item => item.product._id === newCart.listProduct[0].product._id,
        );
        if (productIndex >= 0) {
          newState[cartIndex].listProduct[productIndex].quantity =
            newState[cartIndex].listProduct[productIndex].quantity +
            newCart.listProduct[0].quantity;
          return newState;
        }
        newState[cartIndex].listProduct.push(newCart.listProduct[0]);
        return newState;
      }
      return [...state, action.payload];
    case 'DELETE_CART': {
      return state.filter(item => item._id !== action.payload._id);
    }
    case 'DELETE_ITEM_CART': {
      const newState = [...state];
      const newCart = action.payload;
      const cartIndex = state.findIndex(item => item._id === newCart._id);
      if ((cartIndex >= 0) & (state[cartIndex].listProduct.length < 2)) {
        return state.filter(item => item._id !== action.payload._id);
      }
      console.log(state[cartIndex].listProduct.length);
      const productIndex = newState[cartIndex].listProduct.findIndex(
        item => item.product._id === newCart.product._id,
      );
      newState[cartIndex].listProduct.splice(productIndex, 1);
      return newState;
    }
  }

  return state;
};
export default cartItems;
