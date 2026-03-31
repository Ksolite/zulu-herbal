=====================================
FILE 22: app/api/search/route.ts
=====================================
import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    const [productsCollection, blogCollection] = await Promise.all([
      getCollection('products'),
      getCollection('blog')
    ]);

    const searchFilter = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    };

    const [products, blogPosts] = await Promise.all([
      productsCollection.find(searchFilter).limit(10).toArray(),
      blogCollection.find({ ...searchFilter, published: true }).limit(10).toArray()
    ]);

    return NextResponse.json({ products, blogPosts });
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
