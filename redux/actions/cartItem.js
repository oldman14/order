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

export const deleteItemCart = (cart) =>{
    return {
        type: 'DELETE_ITEM_CART',
        payload: cart
    }
}