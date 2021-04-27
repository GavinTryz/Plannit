import setUser from './storeUser';
import setJWT from './storeJWT';
import setViewEvent from './storeViewEvent';
import storeList from './storeList';
import storeMyWeek from './storeMyWeek';
import storeMyEvents from './storeMyEvents';
import storeParticipantEvents from './storeParticipantEvents';
import storeEventData from './storeEventData';
import setClearWeek from './setClearWeek';
import setWeekTime from './setWeekTime';
import storeSearchEvents from './storeSearchEvents';
import storeLogin from './storeLogin';
import storeCreateId from './storeCreateId';
import storeCreateName from './storeCreateName';

import {combineReducers} from 'redux';


const allReducers = combineReducers ({
    userData : setUser,
    userJWT : setJWT,
    eventTable : setViewEvent,
    participantList : storeList,
    myWeek : storeMyWeek,
    myEvents : storeMyEvents,
    participantEvents : storeParticipantEvents,
    eventData : storeEventData,
    clearWeek : setClearWeek,
    weekTime: setWeekTime,
    searchEvents : storeSearchEvents,
    login : storeLogin,
    createId : storeCreateId,
    createName : storeCreateName
});

export default allReducers;