export const shopReducer = (state={}, action)=>{
    switch(action.type){
        case 'FETCH_SHOP_PRODUCTS_REQUEST':
        return {
            ...state,
            loading: true,
        } 
        case 'FETCH_SHOP_PRODUCTS' : 
        return {
            loading : false,
            products : action.payload
        }
        default : 
            console.log("shop")
            console.log({state})
            return { ...state};
    }
}