const storeList = (state = null, action) => {
    switch(action.type){
        case "STORE_LIST":   
             return action.payload;

        case "CLEAR_DATA":
            return null;

        default:
            return state;
    }
}

export default storeList;