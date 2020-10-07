// feature-1
import React, { useEffect, useState } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import data from './data.json'

function App() {
  // States
  const [products, setProducts] = useState([])
  const [size, setSize] = useState([])
  const [sort, setSort] = useState([])
  const [cartItems, setCartItems] = useState([])

  // useEffect
  useEffect(() => {
    setProducts(data.products)
  }, [])

  // Filter fn
  const filterProducts = (event) => {
    console.log(event.target.value)
    if(event.target.value === "ALL"){
      setSize(event.target.value)
      setProducts(data.products)
    }else{
      setSize(event.target.value)
      setProducts(data.products.filter(product => product.availableSizes.indexOf(event.target.value) >= 0))
    }
  }

  // Sort fn
  const sortProducts = (event) => {
    console.log(event.target.value)
    const sort = event.target.value
    setSort(sort)
    setProducts(
      products.slice().sort((a, b) => 
        sort === "lowest" ? a.price > b.price ? 1 : -1 :
        sort === "highest" ? a.price < b.price ? 1 : -1 :
        a._id < b._id ? 1 : -1
      )
    )
  }

  // Add To Cart Fn
  const addToCart = (product) => {
    const newCartItems = cartItems.slice() // Check product existance, add to cart items
    console.log(newCartItems)
    let alreadyInCart = false
    newCartItems.forEach(item => {
      if(item._id === product._id){
        item.count++
        alreadyInCart = true
      }
    })
    if(!alreadyInCart){
      newCartItems.push({...product, count: 1})
    }
    setCartItems(newCartItems)
  }

  // removeFromCart
  const removeFromCart = (product) => {
    const newCartItems = cartItems.slice() // Check product existance, add to cart items
    setCartItems(newCartItems.filter(x => x._id !== product._id))
  }

  return (
    <div className="grid-container">

      {/* Header */}
      <header className="grid-header">
        <a href="/">React Shopping Cart</a>
      </header>

      {/* Main */}
      <main>
        <div className="content">
          <div className="main">
            <Filter 
              count={products.length} 
              size={size} 
              sort={sort} 
              filterProducts={filterProducts} 
              sortProducts={sortProducts} 
              products={products} 
            />
            <Products products={products} addToCart={addToCart} />
          </div>
          <div className="sidebar">
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        All right is reserved.
      </footer>
    </div>
  );
}

export default App;
