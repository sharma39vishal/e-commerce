const ProductReducer = (state, action) => {
    // if(action.type === "SET_LOADING"){
    //     return{
    //         ...state,
    //         isLoading: true,
    //     };
    // }
    if (action.type === "API_ERROR"){
        return{
            ...state,
            isError: true, 
        };
    }
    if(action.type === "SET_API_DATA"){
        const featureData = action.payload.filter((curElem)=>{
            return curElem.feature === "true";
        });
        console.log("ac", featureData)
        return{
            ...state,
            products: action.payload,
            featureProducts: featureData,
        }
    }
    if(action.type === "SET_SINGLE_PRODUCT"){
        return{
            ...state,
            singleProduct: action.payload,
        }
    }
    if (action.type === "SET_SINGLE_ERROR"){
        return{
            ...state,
            isError: true, 
        };
    }
  return state;
}

export default ProductReducer