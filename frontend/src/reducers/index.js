import setUser from './storeUser';
import setJWT from './storeJWT';
import setViewEvent from './storeViewEvent';
import storeList from './storeList';
import storeMyWeek from './storeMyWeek';
import storeMyEvents from './storeMyEvents';
import storeParticipantEvents from './storeParticipantEvents';
import storeEventData from './storeEventData';
import storeEventId from './storeEventId';


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
    eventId : storeEventId
});

export default allReducers;