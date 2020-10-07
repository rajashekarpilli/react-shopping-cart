// feature-1
import React, { useEffect, useState } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import data from './data.json'

function App() {
  // States
  const [products, setProducts] = useState([])
  const [size, setSize] = useState([])
  const [sort, setSort] = useState([])

  useEffect(() => {
    setProducts(data.products)
  }, [])

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
            <Products products={products} />
          </div>
          <div className="sidebar">Cart Items</div>
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
