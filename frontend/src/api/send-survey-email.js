// pages/api/send-survey-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { to, subject, formData } = req.body;

  try {
    // Configure your email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailBody = `
      NEW FREE SITE SURVEY REQUEST

      Contact Information:
      -------------------
      Name: ${formData.fullName}
      Phone: ${formData.phone}
      Email: ${formData.email}

      Property Details:
      -----------------
      Address: ${formData.address}
      Property Type: ${formData.propertyType}
      Internet Usage: ${formData.internetUsage}
      Number of Devices: ${formData.numberOfDevices}

      Additional Information:
      ----------------------
      Special Requirements: ${formData.specialRequirements || 'None'}
      
      Submission Details:
      ------------------
      Submitted: ${new Date().toLocaleString()}
      IP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}

      Please follow up with this potential customer within 24 hours.
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: emailBody,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Free Site Survey Request</h2>
          
          <h3 style="color: #374151;">Contact Information</h3>
          <p><strong>Name:</strong> ${formData.fullName}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          
          <h3 style="color: #374151;">Property Details</h3>
          <p><strong>Address:</strong> ${formData.address}</p>
          <p><strong>Property Type:</strong> ${formData.propertyType}</p>
          <p><strong>Internet Usage:</strong> ${formData.internetUsage}</p>
          <p><strong>Number of Devices:</strong> ${formData.numberOfDevices}</p>
          
          <h3 style="color: #374151;">Additional Information</h3>
          <p><strong>Special Requirements:</strong> ${formData.specialRequirements || 'None'}</p>
          
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">
            Submitted: ${new Date().toLocaleString()}<br>
            Please follow up within 24 hours.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
}