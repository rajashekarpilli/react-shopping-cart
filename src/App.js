// feature-1
import React, { useEffect, useState } from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart'

function App() {

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
            <Filter />
            <Products />
          </div>
          <div className="sidebar">
            <Cart />
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
