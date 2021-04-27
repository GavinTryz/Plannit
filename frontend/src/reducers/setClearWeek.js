const setClearWeek = (state = false, action) => {
    switch(action.type){
        case "SET_CLEAR_WEEK":   
             return true;

        case "CLEAR_DATA":
            return false;

        default:
            return state;
    }
}

export default setClearWeek;