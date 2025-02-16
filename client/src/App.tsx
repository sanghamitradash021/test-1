import React, { useState } from 'react';
import ProductForm from './ProductForm';

/**
 * Interface representing a product.
 */
interface Product {
  product_name: string;
  category: string;
  price: number;
  stock: number;
}

/**
 * Main App component.
 * @returns {JSX.Element} The rendered App component.
 */
const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  /**
   * Handles the submission of a new product.
   * @param {Product} product - The product data submitted from the form.
   */
  const handleAddProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <div className="app-container">
      <h1>Product Management</h1>
      <ProductForm onSubmit={handleAddProduct} />
      <h2>Product List</h2>
      <ul className="product-list">
        {products.map((product, index) => (
          <li key={index}>
            <strong>{product.product_name}</strong> - {product.category} - $
            {product.price.toFixed(2)} - Stock: {product.stock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
