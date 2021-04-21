import setUser from './storeUser';
import setJWT from './storeJWT';
import setViewEvent from './storeViewEvent';
import storeList from './storeList';
import storeMyWeek from './storeMyWeek';


import {combineReducers} from 'redux';


const allReducers = combineReducers ({
    userData : setUser,
    userJWT : setJWT,
    eventTable : setViewEvent,
    participantList : storeList,
    myWeek : storeMyWeek
});

export default allReducers;