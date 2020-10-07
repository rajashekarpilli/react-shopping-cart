import React from 'react'
import formatCurrency from '../util'

const Cart = ({ cartItems, removeFromCart }) => {
    return (
        <div className="cart-wrap">
            <div className="cart-top">
                {cartItems.length === 0 ?
                    <div className="cart cart-header">Your cart is empty.</div> :
                    <div className="cart cart-header">You have {cartItems.length} item{cartItems.length > 1 ? "s" : null} in the cart.</div>
                }
            </div>

            <div className="cart cart-mid">
                <ul className="cart-items">
                    {cartItems.map(item => (
                        <li key={item._id}>
                            <div>
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div>
                                <div>{item.title}</div>
                                <div className="right">
                                    {formatCurrency(item.price)} x {item.count}{" "}
                                    <button className="button" onClick={() => removeFromCart(item)}>Remove</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {cartItems.length !== 0 && (
                <div className="cart">
                    <div className="total">
                        <div>
                            Total:{" "}
                            {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
                        </div>
                        <button className="button primary">Remove</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart