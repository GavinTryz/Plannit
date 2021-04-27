const setWeekTime = (state = null, action) => {
    switch(action.type){
        case "SET_CLEAR_WEEK":   
             return action.payload;

        case "CLEAR_DATA":
            return null;

        default:
            return state;
    }
}

export default setWeekTime;