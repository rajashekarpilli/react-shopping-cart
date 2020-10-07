import React, { useState } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import Modal from 'react-modal'

const Products = ({ products, addToCart }) => {
    const [product, setProduct] = useState(null)

    const openModal = (product) => {
        setProduct(product)
    }
    const closeModal = (product) => {
        setProduct(null)
    }

    return (
        <div className="products">
            <Fade bottom cascade={true}>
                <ul>
                    {products.map(product => (
                        <li key={product._id}>
                            <div className="product">
                                <a href={"#" + product._id} className="product-link" onClick={() => openModal(product)}>
                                    <img src={product.image} alt={product.title} />
                                    <p>{product.title}</p>
                                </a>
                                <div className="product-price">
                                    <div>{formatCurrency(product.price)}</div>
                                    <button className="button primary" onClick={() => addToCart(product)}>Add To Cart</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </Fade>

            {product && (
                <Modal isOpen={true} onRequestClose={closeModal}>
                    <Zoom>
                        <button className="modal-close button" onClick={closeModal}>x</button>
                        <div className="product-details">
                            <img src={product.image} alt={product.title} />
                            <div className="product-details-description">
                                <p className="mb-2"><strong>{product.title}</strong></p>
                                <p className="mb-2">{product.description}</p>
                                <p className="mb-2">Available sizes:{" "}
                                    {product.availableSizes.map(x => (
                                        <span>
                                            {" "}
                                            <button className="button">{x}</button>
                                        </span>
                                    ))}
                                </p>

                                <div className="product-price">
                                    <div>{formatCurrency(product.price)}</div>
                                    <button className="button primary"
                                        onClick={() => {
                                            addToCart(product)
                                            closeModal()
                                        }}
                                    >Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </Modal>
            )}
        </div>
    )
}

export default Products