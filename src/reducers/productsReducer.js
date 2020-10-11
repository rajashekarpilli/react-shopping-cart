import * as actions from '../actions/productsActions'

export const initialState = {
    products: [],
    loading: false,
    hasErrors: false,
    filteredItems: [],
    size: "",
    sort: ""
}

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_PRODUCTS:
            return { ...state, loading: true }
        case actions.GET_PRODUCTS_SUCCESS:
            return { ...state, products: action.payload, loading: false, hasErrors: false, filteredItems: action.payload }
        case actions.GET_PRODUCTS_FAILURE:
            return { ...state, loading: false, hasErrors: true }
        case actions.FILTER_PRODUCTS_BY_SIZE:
            return { ...state, size: action.payload.size, filteredItems: action.payload.items}
        case actions.ORDER_PRODUCTS_BY_PRICE:
            return { ...state, sort: action.payload.sort, filteredItems: action.payload.items}
        default:
            return state
    }
}