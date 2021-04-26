const storeEventId = (state = null, action) => {
    switch(action.type){
        case "STORE_EVENT_ID":   
             return action.payload;

        case "CLEAR_DATA":
            return null;

        default:
            return state;
    }
}

export default storeEventId;