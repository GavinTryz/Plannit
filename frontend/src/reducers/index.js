import setUser from './storeUser';
import setJWT from './storeJWT';

import {combineReducers} from 'redux';


const allReducers = combineReducers ({
    userData : setUser,
    userJWT : setJWT
});

export default allReducers;