import cartItems from './cartItem';
import {combineReducers} from 'redux';
import user from './user';

const rootReducers = combineReducers({
  cart: cartItems,
  user: user,
});

export default rootReducers;
