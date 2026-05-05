const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  // In development, log emails to console instead of sending
  if (process.env.NODE_ENV === 'development' && !process.env.SMTP_HOST) {
    console.log('📧 Email: Running in development mode (emails logged to console)');
    return null;
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

/**
 * Send verification email after registration
 */
async function sendVerificationEmail(email, name, token) {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify?token=${token}`;

  const html = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #fdf8f0; border: 2px solid #d4b896; border-radius: 8px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #7B1E1E, #4a1010); padding: 28px; text-align: center; color: #fff;">
        <h1 style="font-family: Georgia, serif; margin: 0; font-size: 22px;">IIT (ISM) Dhanbad</h1>
        <p style="margin: 4px 0 0; font-size: 12px; color: #C6A44E; letter-spacing: 2px;">ALUMNI NETWORK — CENTENARY YEAR 2026</p>
      </div>
      <div style="padding: 28px;">
        <h2 style="color: #2c0f0f; font-family: Georgia, serif;">Welcome, ${name}!</h2>
        <p style="color: #5a4a3a; line-height: 1.7;">Thank you for registering on the IIT (ISM) Dhanbad Alumni Portal. Please verify your email to complete registration.</p>
        <a href="${verifyUrl}" style="display: inline-block; background: #7B1E1E; color: #fff; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 16px 0;">Verify Email →</a>
        <p style="color: #8a7a6a; font-size: 13px; margin-top: 20px;">This link expires in 24 hours. If you didn't register, please ignore this email.</p>
      </div>
      <div style="background: #2c0f0f; padding: 14px; text-align: center; color: rgba(255,255,255,0.4); font-size: 11px;">
        © 2026 IIT (ISM) Dhanbad Alumni Association — Est. 1926
      </div>
    </div>`;

  const transport = getTransporter();
  if (!transport) {
    console.log(`\n📧 VERIFICATION EMAIL (dev mode):`);
    console.log(`   To: ${email}`);
    console.log(`   Verify URL: ${verifyUrl}\n`);
    return;
  }

  await transport.sendMail({
    from: `"IIT (ISM) Alumni Portal" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Verify your email — IIT (ISM) Dhanbad Alumni Portal',
    html,
  });
}

/**
 * Send password reset email
 */
async function sendPasswordResetEmail(email, name, token) {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const transport = getTransporter();
  if (!transport) {
    console.log(`\n📧 PASSWORD RESET EMAIL (dev mode):`);
    console.log(`   To: ${email}`);
    console.log(`   Reset URL: ${resetUrl}\n`);
    return;
  }

  await transport.sendMail({
    from: `"IIT (ISM) Alumni Portal" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Password Reset — IIT (ISM) Dhanbad Alumni Portal',
    html: `<p>Hi ${name},</p><p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`,
  });
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
