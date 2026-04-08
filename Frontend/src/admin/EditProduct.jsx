import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setform] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: ""
  });

  const allowedFields = ["title", "description", "price", "image", "stock"];

  const loadProduct = async () => {
    const res = await api.get(`/product/${id}`);
    setform(res.data);
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/product/update/${id}`, form);
    alert("Product updated");
    navigate("/admin/product");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {allowedFields.map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className="w-full p-2 border border-gray-300 rounded-2xl"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;