import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './../reducers/index';
import mySaga from './../sagas/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;

const sagaMiddleware = createSagaMiddleware();

export const store =  createStore(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
sagaMiddleware.run(mySaga);