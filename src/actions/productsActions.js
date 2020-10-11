// Create Redux action types
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE'

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