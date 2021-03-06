export const storeUser = data => {
    return{
        type: 'STORE_DATA',
        payload: data
    };
};


export const storeJWT = data => {
    return{
        type: 'STORE_JWT',
        payload: data
    };
};

export const logOut = () => {
    return{
        type: 'CLEAR_DATA',
    };
};

export const storeEventTable = data => {
    return{
        type: 'STORE_VIEW',
        payload: data
    };
};

export const storeList = data => {
    return{
        type: 'STORE_LIST',
        payload: data
    };
};

export const storeMyWeek = data => {
    return{
        type: 'STORE_MY_WEEK',
        payload: data
    };
};
      
export const storeCreatorEvents = data => {
    return{
        type: 'STORE_MY_EVENTS',
        payload: data
    };
};

export const storeParticipantEvents = data => {
    return{
        type: 'STORE_PARTICIPANT_EVENTS',
        payload: data
    };
};

export const storeEventData = data => {
    return{
        type: 'STORE_EVENT_DATA',
        payload: data
    };
};

export const setClearWeek = () => {
    return{
        type: 'SET_CLEAR_WEEK'
    };
};

export const setWeekTime = data => {
    return{
        type: 'SET_WEEK_TIME',
        payload: data
    };
};