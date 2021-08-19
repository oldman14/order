import cartItems from "./cartItem";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
    cart: cartItems
})

export default rootReducers