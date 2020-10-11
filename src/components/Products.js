import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import Modal from 'react-modal'
import { fetchProducts } from '../actions/productsActions'
import { addToCart } from '../actions/cartActions'

const Products = ({ loading, hasErrors, products, addToCart, fetchProducts }) => {
    const [product, setProduct] = useState(null)

    const openModal = (product) => {
        setProduct(product)
    }
    const closeModal = (product) => {
        setProduct(null)
    }

    // useEffect
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className="products">
            <Fade bottom cascade={true}>
                {loading ? <div>Loading...</div>
                    : products.length === 0 ? <div>Products not found.</div>
                        : products.length > 0 ?
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
                            : hasErrors ? <div>Error has occured. Unable to load products. Please try again after sometime.</div> : null}
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

export default connect(
    (state) => ({
        loading: state.products.loading,
        products: state.products.filteredItems,
        hasErrors: state.products.hasErrors,
    }),
    {
        fetchProducts,
        addToCart,
    }
)(Products);