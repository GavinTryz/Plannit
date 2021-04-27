const setWeekTime = (state = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18], action) => {
    switch(action.type){
        case "SET_WEEK_TIME":   
             return action.payload;

        case "CLEAR_DATA":
            return null;

        default:
            return state;  //times that show on cal
    }
}

export default setWeekTime;