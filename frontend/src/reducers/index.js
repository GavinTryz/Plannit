import setUser from './storeUser';

import {combineReducers} from 'redux';


const allReducers = combineReducers ({
    userData : setUser //,
});

export default allReducers;