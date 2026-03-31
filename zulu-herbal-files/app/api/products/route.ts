=====================================
FILE 17: app/api/products/route.ts
=====================================
import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';
    const limit = parseInt(searchParams.get('limit') || '20');

    const productsCollection = await getCollection('products');

    const filter: any = {};
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }
    if (category) filter.category = category;
    if (status) filter.status = status;

    const products = await productsCollection
      .find(filter)
      .limit(limit)
      .toArray();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const productsCollection = await getCollection('products');

    const result = await productsCollection.insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({ _id: result.insertedId, ...data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
