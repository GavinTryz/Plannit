import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*
import {createStore} from 'redux';
import allReducer from '//file location';
import { Provider } from 'react-redux';

//STORE -> GLOBALIZED STATE

//ACTION (just describes action)
//just returns an object eg.
const incrememt = () => {
  return {
      type: 'INCREMENT'
      }
}

//REDUCER (how action modifies storage)

const counter = (state = 0, action) => {
 switch(action.type){
   case "INCREMENT":   
      return state + 1; //for dec, state - 1
 }
}

let store = createStore(counter)

//DISPATCH (executes action)

store.dispatch(increment());  //1
store.dispatch(decrement());  //0
store.dispatch(decrement());  //-1
*/

ReactDOM.render(
  //<Provider store = {store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  //<Provider>
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
