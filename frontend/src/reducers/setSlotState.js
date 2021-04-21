const setSlotState = (state = false, action) => {
    switch(action.type){
        case "HOVER_SLOT_STATE":   
             return !state;
        case "CLEAR_DATA":
            return false;

        default:
            return state;
    }
}

export default setSlotState;