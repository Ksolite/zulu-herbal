// app/admin/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Leaf, Plus, Edit2, Trash2, LogOut } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  products: number;
  appointments: number;
  testimonials: number;
  messages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ products: 0, appointments: 0, testimonials: 0, messages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (response.ok) {
          setStats(await response.json());
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const menuItems = [
    { label: 'Products', href: '/admin/products', icon: '📦' },
    { label: 'Services', href: '/admin/services', icon: '⚕️' },
    { label: 'Testimonials', href: '/admin/testimonials', icon: '⭐' },
    { label: 'Blog Posts', href: '/admin/blog', icon: '📝' },
    { label: 'Appointments', href: '/admin/appointments', icon: '📅' },
    { label: 'Messages', href: '/admin/messages', icon: '💬' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-screen bg-gray-800 border-r border-gray-700 p-6 overflow-y-auto">
        <div className="flex items-center gap-3 mb-8">
          <Leaf className="w-8 h-8 text-emerald-500" />
          <span className="text-xl font-bold text-white">Zulu Admin</span>
        </div>

        <nav className="space-y-2 mb-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <button className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Products', value: stats.products, color: 'bg-blue-600' },
              { label: 'Appointments', value: stats.appointments, color: 'bg-green-600' },
              { label: 'Testimonials', value: stats.testimonials, color: 'bg-purple-600' },
              { label: 'Messages', value: stats.messages, color: 'bg-orange-600' },
            ].map((stat, i) => (
              <div key={i} className={`${stat.color} rounded-lg p-6 text-white`}>
                <p className="text-gray-200 mb-2">{stat.label}</p>
                <p className="text-4xl font-bold">{loading ? '...' : stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-emerald-500 transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{item.icon}</span>
                  <Plus className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Manage {item.label}</h3>
                <p className="text-gray-400 text-sm">View, create, edit, or delete {item.label.toLowerCase()}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
