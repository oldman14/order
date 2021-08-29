import {createStore, applyMiddleware} from 'redux';
import rootReducers from '../reducers';
import createSagaMiddleware from '@redux-saga/core';
import {helloSaga} from '../saga/saga';
import {persistStore, persistReducer, Storage} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
export const persistor = persistStore(store);

export default store;
sagaMiddleware.run(helloSaga);
