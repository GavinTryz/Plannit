import setUser from './storeUser';
import setJWT from './storeJWT';
import setViewEvent from './storeViewEvent';

import {combineReducers} from 'redux';


const allReducers = combineReducers ({
    userData : setUser,
    userJWT : setJWT,
    eventTable : setViewEvent
});

export default allReducers;