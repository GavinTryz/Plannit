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