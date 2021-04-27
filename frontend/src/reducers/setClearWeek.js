const setClearWeek = (state = false, action) => {
    switch(action.type){
        case "SET_CLEAR_WEEK_TRUE":   
             return true;

        case "SET_CLEAR_WEEK_FALSE":   
             return false;

        case "CLEAR_DATA":
            return false;

        default:
            return state;
    }
}

export default setClearWeek;