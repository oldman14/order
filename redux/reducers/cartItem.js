const initialState = [];
const cartItems = (state = initialState, action)=>{
    switch (action.type){
        case 'ADD_CART':
            const newCart = action.payload;
            const cartIndex = state.findIndex(item => item.product.id === newCart.product.id)
            if(cartIndex >= 0){
                const newState = [...state];
                newState[cartIndex].quantity = newState[cartIndex].quantity + newCart.quantity;
                return newState
            }
            return [...state, action.payload]
        }
    return state

}
export default cartItems