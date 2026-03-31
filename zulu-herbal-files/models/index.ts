=====================================
FILE 16: models/index.ts
=====================================
export interface Product {
  _id?: string;
  name: string;
  description: string;
  category: 'treatment' | 'ointment' | 'supplement';
  status: 'FDA Registered' | 'Pending Registration';
  image?: string;
  price: number;
  stock: number;
  benefits: string[];
  instructions: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonial {
  _id?: string;
  customerName: string;
  condition: string;
  message: string;
  rating: number;
  image?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image?: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  _id?: string;
  customerName: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  service: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
  read: boolean;
  createdAt: Date;
}
