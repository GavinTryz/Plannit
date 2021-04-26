const toggleEmailState = (state = true, action) => {
    switch(action.type){
        case "TOGGLE_EMAIL_STATE":   
             return !state;

        default:
            return true;
    }
}

export default toggleEmailState;