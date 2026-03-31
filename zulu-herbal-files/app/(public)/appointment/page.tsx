=====================================
FILE 12: app/(public)/appointment/page.tsx
=====================================
'use client';

import { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Leaf } from 'lucide-react';
import Link from 'next/link';

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: 'General Consultation',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const services = [
    'General Consultation',
    'Stroke Treatment',
    'Blood Pressure Management',
    'Diabetes Care',
    'Skin Disease Treatment',
    'Prostate Care',
    'Massage Therapy',
    'Detoxification',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          customerName: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          service: 'General Consultation',
          message: '',
        });

        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Failed to book appointment:', error);
      alert('Error booking appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-900">Zulu Herbal</span>
          </Link>
          <Link href="/" className="text-gray-700 hover:text-emerald-600 transition">
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-12">
          <div className="mb-4 flex justify-center">
            <div className="bg-emerald-100 rounded-full p-3">
              <Calendar className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Book an Appointment</h1>
          <p className="text-lg text-gray-600">Schedule your consultation with our herbal healthcare specialists</p>
        </div>

        {submitted && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-green-900 mb-2">✓ Appointment Booked Successfully!</h3>
            <p className="text-green-700">We will contact you shortly to confirm your appointment.</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0244 223 245"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Service
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
                >
                  {services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Additional Information
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your condition or any special requests..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105"
              >
                {loading ? 'Booking...' : 'Book Appointment'}
              </button>
              <Link href="/" className="flex-1 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold py-3 rounded-lg transition text-center">
                Cancel
              </Link>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600 mb-4">Prefer to call? We're here to help!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:0244223245" className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg transition font-semibold">
                <Phone size={20} />
                0244 223 245
              </a>
              <a href="tel:0592860949" className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg transition font-semibold">
                <Phone size={20} />
                0592 860 949
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2024 Zulu Herbal & Supplements Centre. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
