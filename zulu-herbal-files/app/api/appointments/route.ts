=====================================
FILE 20: app/api/appointments/route.ts
=====================================
import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { sendEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    const appointmentsCollection = await getCollection('appointments');
    const appointments = await appointmentsCollection
      .find({})
      .sort({ date: 1 })
      .toArray();

    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const appointmentsCollection = await getCollection('appointments');

    const result = await appointmentsCollection.insertOne({
      ...data,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await sendEmail({
      to: data.email,
      subject: 'Appointment Confirmation - Zulu Herbal',
      html: `
        <h2>Appointment Confirmed</h2>
        <p>Dear ${data.customerName},</p>
        <p>Your appointment has been received. We will confirm your booking shortly.</p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>Date: ${new Date(data.date).toLocaleDateString()}</li>
          <li>Time: ${data.time}</li>
          <li>Service: ${data.service}</li>
        </ul>
        <p>Contact us at 0244 223 245 if you have any questions.</p>
      `
    });

    return NextResponse.json({ _id: result.insertedId, ...data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
  }
}
