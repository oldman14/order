const initialState = [];
const cartItems = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART':
      const newCart = action.payload;
      const cartIndex = state.findIndex(item => item.id === newCart.id);
      if (cartIndex >= 0) {
        const newState = [...state];
        const productIndex = newState[cartIndex].listProduct.findIndex(
          item => item.product.id === newCart.listProduct[0].product.id,
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
      return state.filter(item => item.id !== action.payload.id);
    }
    case 'DELETE_ITEM_CART': {
      const newState = [...state];
      const newCart = action.payload;
      const cartIndex = state.findIndex(item => item.id === newCart.id);
      if(cartIndex>= 0 & state[cartIndex].listProduct.length<2){
        return state.filter(item => item.id !== action.payload.id);
      }
      console.log(state[cartIndex].listProduct.length)
      const productIndex = newState[cartIndex].listProduct.findIndex(
        item => item.product.id === newCart.product.id,
      );
      newState[cartIndex].listProduct.splice(productIndex,1);
      return newState;
    }
  }

  return state;
};
export default cartItems;
