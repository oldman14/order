import {createStore, applyMiddleware} from 'redux'
import rootReducers from '../reducers'
import createSagaMiddleware from '@redux-saga/core'
import { helloSaga } from '../saga/saga'

const sagaMiddleware  = createSagaMiddleware()

export default store = createStore(rootReducers,
    applyMiddleware(sagaMiddleware)    
)

sagaMiddleware.run(helloSaga)