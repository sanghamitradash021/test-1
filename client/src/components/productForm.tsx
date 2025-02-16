import React, { useState } from 'react';

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
 * Props interface for the ProductForm component.
 */
interface ProductFormProps {
  /**
   * Function to handle form submission.
   * @param product - The product data submitted from the form.
   */
  onSubmit: (product: Product) => void;
}

/**
 * ProductForm component for adding a new product.
 * @param {ProductFormProps} props - The component props.
 */
const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [product, setProduct] = useState<Product>({
    product_name: '',
    category: '',
    price: 0,
    stock: 0,
  });

  /**
   * Handles input field changes and updates the product state.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  /**
   * Handles form submission, sending the product data to the backend.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    setProduct({ product_name: '', category: '', price: 0, stock: 0 });
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Add Product</h2>
      <input
        type="text"
        name="product_name"
        value={product.product_name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <input
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="number"
        name="stock"
        value={product.stock}
        onChange={handleChange}
        placeholder="Stock"
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
