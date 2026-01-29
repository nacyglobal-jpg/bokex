import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

// Email configuration
const SMTP_CONFIG = {
  host: 'mail.nacyglobal.com',
  port: 587,
  username: 'support@nacyglobal.com',
  password: '@Naffpro2020',
  from: 'support@nacyglobal.com',
};

// Create SMTP client
const createSMTPClient = () => {
  return new SMTPClient({
    connection: {
      hostname: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
      tls: true,
      auth: {
        username: SMTP_CONFIG.username,
        password: SMTP_CONFIG.password,
      },
    },
  });
};

// ==================== EMAIL TEMPLATES ====================

// User Registration Email
export async function sendUserRegistrationEmail(userData: {
  fullName: string;
  email: string;
  userId: string;
}) {
  const client = createSMTPClient();
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00A8E8 0%, #0052A3 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #00A8E8; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .info-box { background: white; padding: 15px; border-left: 4px solid #00A8E8; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Bokex! 🎉</h1>
        </div>
        <div class="content">
          <h2>Hello ${userData.fullName}!</h2>
          <p>Thank you for registering with Bokex - Kenya's Smart Hotel Booking Platform.</p>
          
          <div class="info-box">
            <strong>Your Account Details:</strong><br>
            <strong>User ID:</strong> ${userData.userId}<br>
            <strong>Email:</strong> ${userData.email}
          </div>
          
          <p>You can now:</p>
          <ul>
            <li>Browse hotels, BnBs, and self-stay houses across Kenya</li>
            <li>Make instant bookings with M-PESA payment</li>
            <li>Manage your bookings in your account dashboard</li>
            <li>Leave reviews and ratings for properties</li>
          </ul>
          
          <a href="https://bokex.com" class="button">Start Booking Now</a>
          
          <p>If you have any questions, feel free to contact our support team.</p>
        </div>
        <div class="footer">
          <p>© 2026 Bokex. Smart Stays. Seamless Booking.</p>
          <p>This email was sent from an automated system. Please do not reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await client.send({
      from: SMTP_CONFIG.from,
      to: userData.email,
      subject: "Welcome to Bokex - Registration Successful! 🎉",
      content: htmlContent,
      html: htmlContent,
    });
    await client.close();
    console.log(`Registration email sent to ${userData.email}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to send registration email to ${userData.email}:`, error);
    await client.close();
    return { success: false, error };
  }
}

// Partner Registration Email
export async function sendPartnerRegistrationEmail(partnerData: {
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  partnerId: string;
}) {
  const client = createSMTPClient();
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00A8E8 0%, #0052A3 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #0052A3; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .info-box { background: white; padding: 15px; border-left: 4px solid #0052A3; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome Partner! 🏨</h1>
        </div>
        <div class="content">
          <h2>Hello ${partnerData.firstName} ${partnerData.lastName}!</h2>
          <p>Congratulations! Your hotel/property partner account has been successfully created on Bokex.</p>
          
          <div class="info-box">
            <strong>Partner Account Details:</strong><br>
            <strong>Partner ID:</strong> ${partnerData.partnerId}<br>
            <strong>Business Name:</strong> ${partnerData.businessName}<br>
            <strong>Email:</strong> ${partnerData.email}
          </div>
          
          <p><strong>Next Steps:</strong></p>
          <ol>
            <li>Complete your property listing details</li>
            <li>Add high-quality photos of your property</li>
            <li>Set your pricing and availability</li>
            <li>Start receiving bookings!</li>
          </ol>
          
          <p><strong>Your Partner Dashboard gives you access to:</strong></p>
          <ul>
            <li>Real-time booking management</li>
            <li>Calendar view of reservations</li>
            <li>Guest reviews and ratings</li>
            <li>Earnings and payment tracking</li>
            <li>Messaging with guests</li>
          </ul>
          
          <a href="https://bokex.com/partner-dashboard" class="button">Access Your Dashboard</a>
          
          <p>Our team is here to support you. If you need any assistance, don't hesitate to reach out.</p>
        </div>
        <div class="footer">
          <p>© 2026 Bokex. Partner with us. Grow your business.</p>
          <p>Support: support@nacyglobal.com | Phone: +254 XXX XXX XXX</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await client.send({
      from: SMTP_CONFIG.from,
      to: partnerData.email,
      subject: "Welcome to Bokex Partner Program! 🏨",
      content: htmlContent,
      html: htmlContent,
    });
    await client.close();
    console.log(`Partner registration email sent to ${partnerData.email}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to send partner registration email to ${partnerData.email}:`, error);
    await client.close();
    return { success: false, error };
  }
}

// Property Listing Confirmation Email
export async function sendPropertyListingEmail(propertyData: {
  ownerName: string;
  ownerEmail: string;
  propertyName: string;
  propertyType: string;
  propertyId: string;
}) {
  const client = createSMTPClient();
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0052A3 0%, #00A8E8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #00A8E8; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .info-box { background: white; padding: 15px; border-left: 4px solid #00A8E8; margin: 20px 0; }
        .success { color: #10b981; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Property Listed Successfully! ✅</h1>
        </div>
        <div class="content">
          <h2>Hello ${propertyData.ownerName}!</h2>
          <p class="success">Great news! Your property has been successfully listed on Bokex.</p>
          
          <div class="info-box">
            <strong>Property Details:</strong><br>
            <strong>Property ID:</strong> ${propertyData.propertyId}<br>
            <strong>Property Name:</strong> ${propertyData.propertyName}<br>
            <strong>Property Type:</strong> ${propertyData.propertyType}
          </div>
          
          <p><strong>Your property is now:</strong></p>
          <ul>
            <li>✅ Visible to thousands of travelers across Kenya</li>
            <li>✅ Ready to receive booking requests</li>
            <li>✅ Indexed for search results</li>
          </ul>
          
          <p><strong>To maximize your bookings:</strong></p>
          <ol>
            <li>Add professional photos of your property</li>
            <li>Write a compelling property description</li>
            <li>Keep your calendar updated</li>
            <li>Respond quickly to booking inquiries</li>
            <li>Maintain competitive pricing</li>
          </ol>
          
          <a href="https://bokex.com/properties/${propertyData.propertyId}" class="button">View Your Property</a>
          
          <p>Start managing your property and track bookings in your dashboard.</p>
        </div>
        <div class="footer">
          <p>© 2026 Bokex. Helping you succeed.</p>
          <p>Need help? Contact support@nacyglobal.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await client.send({
      from: SMTP_CONFIG.from,
      to: propertyData.ownerEmail,
      subject: `Property Listed: ${propertyData.propertyName} - Now Live on Bokex! ✅`,
      content: htmlContent,
      html: htmlContent,
    });
    await client.close();
    console.log(`Property listing email sent to ${propertyData.ownerEmail}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to send property listing email to ${propertyData.ownerEmail}:`, error);
    await client.close();
    return { success: false, error };
  }
}

// Booking Confirmation Email (to Guest)
export async function sendBookingConfirmationEmail(bookingData: {
  guestName: string;
  guestEmail: string;
  bookingId: string;
  hotelName: string;
  hotelLocation: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalAmount: number;
}) {
  const client = createSMTPClient();
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00A8E8 0%, #0052A3 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .booking-box { background: white; padding: 20px; border: 2px solid #00A8E8; border-radius: 8px; margin: 20px 0; }
        .success-badge { background: #10b981; color: white; padding: 5px 15px; border-radius: 20px; display: inline-block; margin: 10px 0; }
        table { width: 100%; margin: 15px 0; }
        td { padding: 8px; border-bottom: 1px solid #ddd; }
        .label { font-weight: bold; color: #0052A3; }
        .amount { font-size: 24px; font-weight: bold; color: #00A8E8; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmed! 🎉</h1>
          <div class="success-badge">CONFIRMED</div>
        </div>
        <div class="content">
          <h2>Hello ${bookingData.guestName}!</h2>
          <p>Your booking has been confirmed! We're excited to host you.</p>
          
          <div class="booking-box">
            <h3 style="margin-top: 0; color: #0052A3;">📋 Booking Details</h3>
            <table>
              <tr>
                <td class="label">Booking ID:</td>
                <td><strong>${bookingData.bookingId}</strong></td>
              </tr>
              <tr>
                <td class="label">Hotel/Property:</td>
                <td>${bookingData.hotelName}</td>
              </tr>
              <tr>
                <td class="label">Location:</td>
                <td>${bookingData.hotelLocation}</td>
              </tr>
              <tr>
                <td class="label">Room Type:</td>
                <td>${bookingData.roomType}</td>
              </tr>
              <tr>
                <td class="label">Check-in:</td>
                <td>${bookingData.checkIn}</td>
              </tr>
              <tr>
                <td class="label">Check-out:</td>
                <td>${bookingData.checkOut}</td>
              </tr>
              <tr>
                <td class="label">Duration:</td>
                <td>${bookingData.nights} night(s)</td>
              </tr>
              <tr>
                <td class="label">Guests:</td>
                <td>${bookingData.guests} guest(s)</td>
              </tr>
              <tr style="border-top: 2px solid #0052A3;">
                <td class="label">Total Amount:</td>
                <td><span class="amount">KES ${bookingData.totalAmount.toLocaleString()}</span></td>
              </tr>
            </table>
          </div>
          
          <p><strong>Important Information:</strong></p>
          <ul>
            <li>Please arrive during check-in hours</li>
            <li>Bring a valid ID for verification</li>
            <li>Keep your booking ID handy: <strong>${bookingData.bookingId}</strong></li>
            <li>Payment receipt will be sent separately</li>
          </ul>
          
          <a href="https://bokex.com/bookings/${bookingData.bookingId}" class="button">View Booking Details</a>
          
          <p>If you have any questions or need to make changes, please contact us or the property directly.</p>
          
          <p style="margin-top: 30px;">Safe travels! 🧳</p>
        </div>
        <div class="footer">
          <p>© 2026 Bokex. Smart Stays. Seamless Booking.</p>
          <p>Questions? Email support@nacyglobal.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await client.send({
      from: SMTP_CONFIG.from,
      to: bookingData.guestEmail,
      subject: `Booking Confirmed: ${bookingData.hotelName} - ${bookingData.bookingId}`,
      content: htmlContent,
      html: htmlContent,
    });
    await client.close();
    console.log(`Booking confirmation email sent to ${bookingData.guestEmail}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to send booking confirmation email to ${bookingData.guestEmail}:`, error);
    await client.close();
    return { success: false, error };
  }
}

// Booking Notification Email (to Property Owner)
export async function sendBookingNotificationToOwner(bookingData: {
  ownerName: string;
  ownerEmail: string;
  bookingId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  propertyName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalAmount: number;
}) {
  const client = createSMTPClient();
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0052A3 0%, #00A8E8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #0052A3; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .booking-box { background: white; padding: 20px; border: 2px solid #0052A3; border-radius: 8px; margin: 20px 0; }
        .new-badge { background: #ef4444; color: white; padding: 5px 15px; border-radius: 20px; display: inline-block; margin: 10px 0; }
        table { width: 100%; margin: 15px 0; }
        td { padding: 8px; border-bottom: 1px solid #ddd; }
        .label { font-weight: bold; color: #0052A3; }
        .amount { font-size: 24px; font-weight: bold; color: #10b981; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Booking Received! 🔔</h1>
          <div class="new-badge">NEW BOOKING</div>
        </div>
        <div class="content">
          <h2>Hello ${bookingData.ownerName}!</h2>
          <p>Great news! You have received a new booking for <strong>${bookingData.propertyName}</strong>.</p>
          
          <div class="booking-box">
            <h3 style="margin-top: 0; color: #0052A3;">📋 Booking Details</h3>
            <table>
              <tr>
                <td class="label">Booking ID:</td>
                <td><strong>${bookingData.bookingId}</strong></td>
              </tr>
              <tr>
                <td class="label">Guest Name:</td>
                <td>${bookingData.guestName}</td>
              </tr>
              <tr>
                <td class="label">Guest Email:</td>
                <td>${bookingData.guestEmail}</td>
              </tr>
              <tr>
                <td class="label">Guest Phone:</td>
                <td>${bookingData.guestPhone}</td>
              </tr>
              <tr>
                <td class="label">Room Type:</td>
                <td>${bookingData.roomType}</td>
              </tr>
              <tr>
                <td class="label">Check-in:</td>
                <td>${bookingData.checkIn}</td>
              </tr>
              <tr>
                <td class="label">Check-out:</td>
                <td>${bookingData.checkOut}</td>
              </tr>
              <tr>
                <td class="label">Duration:</td>
                <td>${bookingData.nights} night(s)</td>
              </tr>
              <tr>
                <td class="label">Guests:</td>
                <td>${bookingData.guests} guest(s)</td>
              </tr>
              <tr style="border-top: 2px solid #0052A3;">
                <td class="label">Earnings:</td>
                <td><span class="amount">KES ${bookingData.totalAmount.toLocaleString()}</span></td>
              </tr>
            </table>
          </div>
          
          <p><strong>Action Required:</strong></p>
          <ul>
            <li>✅ Confirm room availability in your calendar</li>
            <li>✅ Prepare the room for guest arrival</li>
            <li>✅ You may contact the guest if needed</li>
            <li>✅ Update your dashboard with any special requests</li>
          </ul>
          
          <a href="https://bokex.com/partner/bookings/${bookingData.bookingId}" class="button">View in Dashboard</a>
          
          <p>Make sure to provide excellent service to earn great reviews!</p>
        </div>
        <div class="footer">
          <p>© 2026 Bokex. Your success is our priority.</p>
          <p>Partner Support: support@nacyglobal.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await client.send({
      from: SMTP_CONFIG.from,
      to: bookingData.ownerEmail,
      subject: `🔔 New Booking: ${bookingData.guestName} - ${bookingData.bookingId}`,
      content: htmlContent,
      html: htmlContent,
    });
    await client.close();
    console.log(`Booking notification email sent to owner ${bookingData.ownerEmail}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to send booking notification to owner ${bookingData.ownerEmail}:`, error);
    await client.close();
    return { success: false, error };
  }
}

// Payment Confirmation Email
export async function sendPaymentConfirmationEmail(paymentData: {
  guestName: string;
  guestEmail: string;
  bookingId: string;
  mpesaCode: string;
  amount: number;
  hotelName: string;
  transactionId: string;
}) {
  const client = createSMTPClient();
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #00A8E8; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .payment-box { background: white; padding: 20px; border: 2px solid #10b981; border-radius: 8px; margin: 20px 0; }
        .success-icon { font-size: 48px; margin: 10px 0; }
        table { width: 100%; margin: 15px 0; }
        td { padding: 8px; border-bottom: 1px solid #ddd; }
        .label { font-weight: bold; color: #059669; }
        .amount { font-size: 28px; font-weight: bold; color: #10b981; }
        .mpesa-code { background: #fef3c7; padding: 10px; border-radius: 5px; font-size: 18px; font-weight: bold; color: #92400e; text-align: center; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="success-icon">✅</div>
          <h1>Payment Successful!</h1>
        </div>
        <div class="content">
          <h2>Hello ${paymentData.guestName}!</h2>
          <p>Your payment has been successfully received and verified.</p>
          
          <div class="payment-box">
            <h3 style="margin-top: 0; color: #059669;">💳 Payment Receipt</h3>
            <table>
              <tr>
                <td class="label">Transaction ID:</td>
                <td><strong>${paymentData.transactionId}</strong></td>
              </tr>
              <tr>
                <td class="label">Booking ID:</td>
                <td>${paymentData.bookingId}</td>
              </tr>
              <tr>
                <td class="label">Hotel/Property:</td>
                <td>${paymentData.hotelName}</td>
              </tr>
              <tr>
                <td class="label">Payment Method:</td>
                <td>M-PESA Paybill</td>
              </tr>
              <tr>
                <td class="label">Paybill Number:</td>
                <td>4005207 - NACY GLOBAL TECHNOLOGIES</td>
              </tr>
              <tr style="border-top: 2px solid #10b981;">
                <td class="label">Amount Paid:</td>
                <td><span class="amount">KES ${paymentData.amount.toLocaleString()}</span></td>
              </tr>
            </table>
            
            <div class="mpesa-code">
              <div style="font-size: 12px; margin-bottom: 5px;">M-PESA CONFIRMATION CODE</div>
              ${paymentData.mpesaCode}
            </div>
          </div>
          
          <p><strong>Payment Status:</strong> ✅ Verified and Confirmed</p>
          
          <p>Your booking is now fully confirmed. You will receive your check-in details closer to your arrival date.</p>
          
          <a href="https://bokex.com/bookings/${paymentData.bookingId}" class="button">View Booking</a>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            <strong>Important:</strong> Please save this email as your payment receipt. You may need to present it during check-in.
          </p>
        </div>
        <div class="footer">
          <p>© 2026 Bokex. Powered by NACY GLOBAL TECHNOLOGIES</p>
          <p>Payment queries: support@nacyglobal.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await client.send({
      from: SMTP_CONFIG.from,
      to: paymentData.guestEmail,
      subject: `Payment Confirmed: KES ${paymentData.amount.toLocaleString()} - ${paymentData.mpesaCode}`,
      content: htmlContent,
      html: htmlContent,
    });
    await client.close();
    console.log(`Payment confirmation email sent to ${paymentData.guestEmail}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to send payment confirmation email to ${paymentData.guestEmail}:`, error);
    await client.close();
    return { success: false, error };
  }
}

// Payment Notification to Admin
export async function sendPaymentNotificationToAdmin(paymentData: {
  bookingId: string;
  guestName: string;
  guestEmail: string;
  mpesaCode: string;
  amount: number;
  hotelName: string;
  propertyOwnerEmail: string;
  transactionId: string;
}) {
  const client = createSMTPClient();
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0052A3 0%, #00A8E8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 15px; border-left: 4px solid #10b981; margin: 20px 0; }
        table { width: 100%; margin: 15px 0; border-collapse: collapse; }
        td { padding: 8px; border-bottom: 1px solid #ddd; }
        .label { font-weight: bold; color: #0052A3; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💰 New Payment Received</h1>
        </div>
        <div class="content">
          <h2>Payment Transaction Alert</h2>
          <p>A new payment has been successfully processed on the Bokex platform.</p>
          
          <div class="info-box">
            <strong>Transaction Summary:</strong><br>
            <table>
              <tr>
                <td class="label">Transaction ID:</td>
                <td>${paymentData.transactionId}</td>
              </tr>
              <tr>
                <td class="label">Booking ID:</td>
                <td>${paymentData.bookingId}</td>
              </tr>
              <tr>
                <td class="label">M-PESA Code:</td>
                <td><strong>${paymentData.mpesaCode}</strong></td>
              </tr>
              <tr>
                <td class="label">Amount:</td>
                <td><strong>KES ${paymentData.amount.toLocaleString()}</strong></td>
              </tr>
              <tr>
                <td class="label">Guest:</td>
                <td>${paymentData.guestName} (${paymentData.guestEmail})</td>
              </tr>
              <tr>
                <td class="label">Property:</td>
                <td>${paymentData.hotelName}</td>
              </tr>
              <tr>
                <td class="label">Property Owner:</td>
                <td>${paymentData.propertyOwnerEmail}</td>
              </tr>
            </table>
          </div>
          
          <p><strong>Status:</strong> ✅ Payment Verified</p>
          <p>This transaction has been recorded in the system and confirmation emails have been sent to the guest.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await client.send({
      from: SMTP_CONFIG.from,
      to: SMTP_CONFIG.from, // Send to admin email
      subject: `💰 Payment Received: KES ${paymentData.amount.toLocaleString()} - ${paymentData.bookingId}`,
      content: htmlContent,
      html: htmlContent,
    });
    await client.close();
    console.log(`Payment notification sent to admin`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to send payment notification to admin:`, error);
    await client.close();
    return { success: false, error };
  }
}
