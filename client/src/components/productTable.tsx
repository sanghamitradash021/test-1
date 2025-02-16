import React from 'react';

interface Product {
  product_id: number;
  product_name: string;
  category: string;
  price: number;
  stock: number;
}

interface ProductTableProps {
  products: Product[];
  onDelete: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onDelete }) => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            key={product.product_id}
            className={product.stock < 10 ? 'low-stock' : ''}
          >
            <td>{product.product_name}</td>
            <td>{product.category}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>{product.stock}</td>
            <td>
              <button
                onClick={() => onDelete(product.product_id)}
                className="delete-btn"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
