export const storeUser = data => {
    return{
        type: 'STORE_DATA',
        payload: data
    };
};

export const storeJWT = data => {
    return{
        type: 'STORE_JWT',
        payload: data
    };
};

export const logOut = () => {
    return{
        type: 'CLEAR_DATA',
    };
};