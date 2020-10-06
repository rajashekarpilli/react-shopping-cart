// feature-1
import React, { useEffect, useState } from 'react';
import Products from './components/Products';
import data from './data.json'

function App() {
  // States
  const [products, setProducts] = useState([])
  const [size, setSize] = useState([])
  const [sort, setSort] = useState([])

  useEffect(() => {
    setProducts(data.products)
  }, [])

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
