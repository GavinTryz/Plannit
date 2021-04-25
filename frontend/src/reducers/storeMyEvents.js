const storeMyEvents = (state = null, action) => {
    switch(action.type){
        case "STORE_MY_EVENTS":   
             return action.payload;

        case "CLEAR_DATA":
            return null;

        default:
            return state;
    }
}

export default storeMyEvents;