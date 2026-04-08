import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router";

const ProductList = () => {
  const [product, setproduct] = useState([]);

  const loadProduct = async () => {
    const response = await api.get("/product");
    setproduct(response.data);
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/product/delete/${id}`);
      alert("Product deleted");
      loadProduct();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product List</h2>
        <Link
          to="/admin/product/add"
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
        >
          Add New Product
        </Link>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Title</th>
            <th className="border border-gray-200 px-4 py-2">Price</th>
            <th className="border border-gray-200 px-4 py-2">Stock</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {product.map((item) => (
            <tr key={item._id} className="text-center">
              <td className="border border-gray-200 px-4 py-2">
                {item.title}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {item.price}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {item.stock}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <Link
                  to={`/admin/product/update/${item._id}`}
                  className="text-blue-500 mr-3"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteProduct(item._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;