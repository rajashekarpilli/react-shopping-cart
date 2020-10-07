import React, { useState } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'

const Cart = ({ cartItems, removeFromCart, placeOrder }) => {
    const [showCheckout, setShowCheckout] = useState(false)
    const initialState = { email: "", name: "", address: "" }
    const [checkout, setCheckout] = useState(initialState)

    const handleInput = (event) => {
        const { name, value } = event.target

        setCheckout({ ...checkout, [name]: value })
    }

    const createOrder = (e) => {
        e.preventDefault()
        const order = {
            email: checkout.email,
            name: checkout.name,
            address: checkout.address,
            cartItems: checkout.cartItems
        }
        placeOrder(order)
    }

    return (
        <div className="cart-wrap">
            <div className="cart-top">
                {cartItems.length === 0 ?
                    <div className="cart cart-header">Your cart is empty.</div> :
                    <div className="cart cart-header">You have {cartItems.length} item{cartItems.length > 1 ? "s" : null} in the cart.</div>
                }
            </div>

            <div className="cart cart-mid">
                <Fade left cascade>
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
                </Fade>
            </div>

            {cartItems.length !== 0 && (
                <div>
                    <div className="cart">
                        <div className="total">
                            <div>
                                Total:{" "}
                                {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
                            </div>
                            <button className="button primary" onClick={() => setShowCheckout(true)}>Proceed</button>
                        </div>
                    </div>
                    {showCheckout && (
                        <Fade right cascade>
                        <div className="cart">
                            <form onSubmit={createOrder}>
                                <ul className="form-container">
                                    <li>
                                        <label>Email</label>
                                        <input name="email" value={checkout.email} type="email" required onChange={handleInput} />
                                    </li>
                                    <li>
                                        <label>Name</label>
                                        <input name="name" value={checkout.name} type="text" required onChange={handleInput} />
                                    </li>
                                    <li>
                                        <label>Address</label>
                                        <input name="address" value={checkout.address} type="text" required onChange={handleInput} />
                                    </li>
                                    <li>
                                        <button type="submit" className="button primary">Checkout</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                        </Fade>
                    )}
                </div>
            )}
        </div>
    )
}

export default Cart