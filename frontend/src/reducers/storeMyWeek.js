const storeMyWeek = (state = null, action) => {
    switch(action.type){
        case "STORE_MY_WEEK":   
             return action.payload;

        case "CLEAR_DATA":
            return null;

        default:
            return state;
    }
}

export default storeMyWeek;