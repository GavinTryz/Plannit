import { createStore } from 'redux';
import allReducer from './reducers';

function saveToSessionStorage(state) {
    try{
        const serializedState = JSON.stringify(state)
        sessionStorage.setItem('state', serializedState)
    } catch(e) {
        console.log(e)
    }
}

function loadFromSessionStorage() {
    try {
        const serializedState = sessionStorage.getItem('state')
        if (serializedState == null) return undefined
        return JSON.parse(serializedState)
    } catch(e) {
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromSessionStorage()

const store = createStore(
    allReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


store.subscribe(() => saveToSessionStorage(store.getState()))


export default store;