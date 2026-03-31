// app/admin/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  status: string;
  category: string;
  price: number;
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'treatment',
    status: 'FDA Registered',
    price: 0,
    benefits: [],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        setProducts(await response.json());
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowForm(false);
        setFormData({
          name: '',
          description: '',
          category: 'treatment',
          status: 'FDA Registered',
          price: 0,
          benefits: [],
        });
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
        fetchProducts();
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 ml-64 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Products</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {/* Add Product Form */}
        {showForm && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500"
                required
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500"
              >
                <option value="treatment">Treatment</option>
                <option value="ointment">Ointment</option>
                <option value="supplement">Supplement</option>
              </select>
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Save Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        {loading ? (
          <div className="text-center text-gray-300">Loading...</div>
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Price</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t border-gray-700 hover:bg-gray-700 transition">
                    <td className="px-6 py-4 text-gray-300">{product.name}</td>
                    <td className="px-6 py-4 text-gray-400">{product.category}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        product.status === 'FDA Registered'
                          ? 'bg-green-900 text-green-300'
                          : 'bg-yellow-900 text-yellow-300'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">GHS {product.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition">
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
