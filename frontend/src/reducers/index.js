import setUser from './storeUser';
import setJWT from './storeJWT';
import setViewEvent from './storeViewEvent';
import storeViewSlot from './storeViewSlot';
import setSlotState from './setSlotState';


import {combineReducers} from 'redux';


const allReducers = combineReducers ({
    userData : setUser,
    userJWT : setJWT,
    eventTable : setViewEvent,
    eventSlot : storeViewSlot,
    slotState : setSlotState
});

export default allReducers;