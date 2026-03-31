=====================================
FILE 19: app/api/blog/route.ts
=====================================
import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    const blogCollection = await getCollection('blog');
    const posts = await blogCollection
      .find({ published: true })
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const blogCollection = await getCollection('blog');

    const result = await blogCollection.insertOne({
      ...data,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({ _id: result.insertedId, ...data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
