=====================================
FILE 21: app/api/contact/route.ts
=====================================
import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const contactCollection = await getCollection('contact');

    const result = await contactCollection.insertOne({
      ...data,
      read: false,
      createdAt: new Date()
    });

    await sendEmail({
      to: data.email,
      subject: 'We Received Your Message',
      html: `
        <h2>Thank You for Contacting Us</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p>Zulu Herbal & Supplements Centre Team</p>
      `
    });

    return NextResponse.json({ success: true, _id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
