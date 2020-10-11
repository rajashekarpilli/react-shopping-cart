import * as actions from '../actions/cartActions'

// export const initialState = {
//     cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]")
// }

// export default function cartReducer(state = initialState, action) {
//     switch (action.type) {
//         case actions.ADD_TO_CART:
//             return { ...state, cartItems: action.payload }
//         case actions.REMOVE_FROM_CART:
//             return { ...state, cartItems: action.payload }
//         default:
//             return state
//     }
// }

export const cartReducer = (
    state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
    action
) => {
    switch (action.type) {
        case actions.ADD_TO_CART:
            return { cartItems: action.payload.cartItems }
        case actions.REMOVE_FROM_CART:
            return { cartItems: action.payload.cartItems }
        default:
            return state;
    }
};