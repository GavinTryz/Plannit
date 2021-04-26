const storeParticipantEvents = (state = null, action) => {
    switch(action.type){
        case "STORE_PARTICIPANT_EVENTS":   
             return action.payload;

        case "CLEAR_DATA":
            return null;

        default:
            return state;
    }
}

export default storeParticipantEvents;