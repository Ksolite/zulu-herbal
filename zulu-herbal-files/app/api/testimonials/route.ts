=====================================
FILE 18: app/api/testimonials/route.ts
=====================================
import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    const testimonialsCollection = await getCollection('testimonials');
    const testimonials = await testimonialsCollection
      .find({ verified: true })
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const testimonialsCollection = await getCollection('testimonials');

    const result = await testimonialsCollection.insertOne({
      ...data,
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({ _id: result.insertedId, ...data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
