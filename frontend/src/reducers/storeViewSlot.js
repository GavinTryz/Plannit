const storeViewSlot = (state = null, action) => {
    switch(action.type){
        case "STORE_VIEW_SLOT":   
             return action.payload;
        case "CLEAR_DATA":
            return null;

        default:
            return state;
    }
}

export default storeViewSlot;