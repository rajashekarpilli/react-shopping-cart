// Create Redux action types
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE'

export const FILTER_PRODUCTS_BY_SIZE = 'FILTER_PRODUCTS_BY_SIZE'
export const ORDER_PRODUCTS_BY_PRICE = 'ORDER_PRODUCTS_BY_PRICE'

// Create Redux action creators that return an action
export const getProducts = () => ({
    type: GET_PRODUCTS,
})

export const getProductsSuccess = (products) => ({
    type: GET_PRODUCTS_SUCCESS,
    payload: products,
})

export const getProductsFailure = () => ({
    type: GET_PRODUCTS_FAILURE,
})

// Combine them all in an asynchronous thunk
export function fetchProducts() {
    return async (dispatch) => {
        dispatch(getProducts())

        try {
            const response = await fetch('/api/products') // http://localhost:5000/api/products
            const data = await response.json()

            dispatch(getProductsSuccess(data))
            // alert("Success")
        } catch (error) {
            dispatch(getProductsFailure())
            // alert("Error")
        }
    }
}

export const filterProducts = (products, size) => (dispatch) => {
    dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items: size === "" ? products : 
            products.filter(x => x.availableSizes.indexOf(size) >= 0)
        }
    })
}

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
    const sortedProducts = filteredProducts.slice()
    if(sort === "latest"){
        sortedProducts.sort((a, b) => a._id > b._id ? 1 : -1)
    }else{
        sortedProducts.sort((a, b) => 
        sort === "lowest" ? a.price > b.price ? 1 : -1 : a.price > b.price ? -1 : 1)
    }
    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: sortedProducts
        }
    })
}