import React, { useState } from 'react';

interface Product {
  product_name: string;
  category: string;
  price: number;
  stock: number;
}

interface ProductFormProps {
  onSubmit: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [product, setProduct] = useState<Product>({
    product_name: '',
    category: '',
    price: 0,
    stock: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product);
    setProduct({ product_name: '', category: '', price: 0, stock: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
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
