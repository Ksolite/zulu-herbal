=====================================
FILE 11: app/(public)/page.tsx
=====================================
'use client';

import { useState, useEffect } from 'react';
import { Leaf, Phone, MapPin, Mail, Heart, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  status: string;
  category: string;
}

interface Testimonial {
  _id: string;
  customerName: string;
  condition: string;
  message: string;
  rating: number;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, testimonialsRes, blogRes] = await Promise.all([
          fetch('/api/products?limit=6'),
          fetch('/api/testimonials?limit=3'),
          fetch('/api/blog?limit=3')
        ]);

        if (productsRes.ok) setProducts(await productsRes.json());
        if (testimonialsRes.ok) setTestimonials(await testimonialsRes.json());
        if (blogRes.ok) setBlogPosts(await blogRes.json());
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const treatments = [
    'Stroke', 'Blood Pressure', 'Diabetes', 'Typhoid', 'Epilepsy',
    'Skin Diseases', 'Prostate Problems', 'Cancer', 'Ulcer', 'Impotence',
    'Hair Loss', 'Malaria', 'Fever', 'Cough', 'Hernia', 'Detoxification'
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">Zulu Herbal</span>
            </Link>

            <div className="hidden md:flex gap-8">
              <Link href="#services" className="text-gray-700 hover:text-emerald-600 transition font-medium text-sm">Services</Link>
              <Link href="#products" className="text-gray-700 hover:text-emerald-600 transition font-medium text-sm">Products</Link>
              <Link href="#testimonials" className="text-gray-700 hover:text-emerald-600 transition font-medium text-sm">Testimonials</Link>
            </div>

            <Link href="/appointment" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition text-sm">
              Book Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-emerald-100 rounded-full p-4 animate-bounce">
                <Leaf className="w-12 h-12 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Zulu Herbal &amp; <span className="text-emerald-600">Supplements Centre</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Specialized in natural, holistic healthcare solutions with ultra-modern therapeutic facilities. FDA-registered herbal products for 16+ conditions.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search products or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
                >
                  <Search size={20} />
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointment" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105">
                Book Appointment
              </Link>
              <Link href="#products" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-lg font-semibold transition">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="bg-white border-t border-b border-emerald-100 py-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-gray-500">Call Us</p>
              <p className="font-semibold text-gray-900">0244 223 245</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-gray-500">Location</p>
              <p className="font-semibold text-gray-900">Kpobi Korpe</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-gray-500">License</p>
              <p className="font-semibold text-gray-900">GW-0137-0646</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-gray-500">Hours</p>
              <p className="font-semibold text-gray-900">9 AM - 6 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive herbal treatment combined with modern therapeutic facilities</p>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Conditions We Treat</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {treatments.map((treatment, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span className="text-gray-700">{treatment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 px-4 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">FDA-registered herbal solutions</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 pr-2">{product.name}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
                      product.status === 'FDA Registered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-4 sm:py-24 bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Patient Testimonials</h2>
            <p className="text-gray-600">Real stories from our satisfied patients</p>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading testimonials...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.message}"</p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.customerName}</p>
                    <p className="text-sm text-gray-500">Treated for {testimonial.condition}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:py-24 bg-gradient-to-r from-emerald-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Start Your Healing Journey?</h2>
          <p className="text-lg text-emerald-50 mb-8">Book an appointment today and experience our professional herbal treatments</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/appointment" className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105 inline-block">
              Book Appointment
            </Link>
            <a href="tel:0244223245" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition inline-block">
              Call: 0244 223 245
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-emerald-500" />
                <span className="font-semibold text-white">Zulu Herbal</span>
              </div>
              <p className="text-sm text-gray-400">Natural healthcare solutions for optimal wellness</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#products" className="hover:text-emerald-400">Products</Link></li>
                <li><Link href="#services" className="hover:text-emerald-400">Services</Link></li>
                <li><Link href="/appointment" className="hover:text-emerald-400">Appointments</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <p className="text-sm mb-2">0244 223 245</p>
              <p className="text-sm">Kpobi Korpe, Amasaman</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Business Hours</h4>
              <p className="text-sm">Mon - Fri: 9 AM - 6 PM</p>
              <p className="text-sm">Sat: 9 AM - 4 PM</p>
              <p className="text-sm">Sun: Closed</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Zulu Herbal & Supplements Centre. All rights reserved.</p>
            <p>License: GW-0137-0646</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
