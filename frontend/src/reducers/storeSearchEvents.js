const storeSearchEvents = (state = null, action) => {
    switch(action.type){
        case "STORE_SEARCH_EVENTS":   
            return action.payload;

        case "CLEAR_DATA":
            return null;

        default:
            return state;
    }
}

export default storeSearchEvents;