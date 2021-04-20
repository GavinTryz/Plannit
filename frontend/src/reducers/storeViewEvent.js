const setViewEvent = (state = null, action) => {
    switch(action.type){
        case "STORE_VIEW":   
             return action.payload;
        case "CLEAR_DATA":
            return null;

        default:
            return state;
    }
}

export default setViewEvent;