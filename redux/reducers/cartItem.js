const initialState = [];
const cartItems = (state = initialState, action)=>{
    switch (action.type){
        case 'ADD_CART':
            const newCart = action.payload;
            const cartIndex = state.findIndex(item => item.id === newCart.id)
            if(cartIndex >= 0){
                const newState = [...state];
                const productIndex = newState[cartIndex].listProduct.findIndex(item => item.product.id === newCart.listProduct[0].product.id);
                console.log(productIndex)
                if(productIndex>=0){
                    newState[cartIndex].listProduct[productIndex].quantity = newState[cartIndex].listProduct[productIndex].quantity + newCart.listProduct[0].quantity;
                    return newState
                }
                newState[cartIndex].listProduct.push(newCart.listProduct[0])
                return newState
            }
            return [...state, action.payload]
        }
    return state

}
export default cartItems