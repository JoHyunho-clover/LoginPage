import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as seviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
//Redux를어플리케이션에 적용하기 위함.---------------------------------------
import {Provider} from 'react-redux'; //react-redux에서 provider가져와서 쓰는것.
import {applyMiddleware, createStore} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const createStoreWithMiddleware=applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)  //Middleware를 써야지만 객체액션만 받는 redux store가 함수와 promise도 받는다.

//Provider로 감싸주면 redux와 어플리케이션을  연결을 시키는 것이다. 근데 store를 넣어야 한다.
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
    > 
    <App />
  </Provider>,
  document.getElementById('root')
);
//-------------------------------------------------------------------------

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
