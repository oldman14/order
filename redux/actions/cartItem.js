export const addCart = (cart) =>{
    return {
        type: 'ADD_CART',
        payload: cart
    }
}

export const deleteCart = (cart)=>{
    return {
        type: 'DELETE_CART',
        payload: cart
    }
}