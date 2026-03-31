=====================================
FILE 14: lib/email.ts
=====================================
import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

let transporter: any = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return transporter;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const transporter = getTransporter();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log(`Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}
