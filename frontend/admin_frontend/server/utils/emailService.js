const nodemailer = require('nodemailer');

// Create transporter using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Send email notification to owner about new registration
const sendRegistrationNotification = async (registrationData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'kissanhelper.9508@gmail.com',
      subject: 'New Admin Registration Request - KissanHelper',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">New Admin Registration Request</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Applicant Details:</h3>
            <p><strong>Full Name:</strong> ${registrationData.fullName}</p>
            <p><strong>Email:</strong> ${registrationData.email}</p>
            <p><strong>Phone:</strong> ${registrationData.phoneNumber}</p>
            <p><strong>Address:</strong> ${registrationData.address}</p>
            <p><strong>Aadhaar Number:</strong> ${registrationData.aadhaarNumber}</p>
            <p><strong>Submitted At:</strong> ${new Date(registrationData.submittedAt).toLocaleString()}</p>
          </div>
          
          <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Files Uploaded:</h3>
            <p>• Aadhaar Card: ${registrationData.aadhaarImage}</p>
            <p>• Applicant Photo: ${registrationData.applicantImage}</p>
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Action Required:</h3>
            <p>Please review the application and:</p>
            <ol>
              <li>Verify the uploaded documents</li>
              <li>Create username and password for this admin</li>
              <li>Send login credentials to: <strong>${registrationData.email}</strong></li>
              <li>Approve the registration in the admin panel</li>
            </ol>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This is an automated notification from KissanHelper Admin System.
          </p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Registration notification email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending registration notification:', error);
    return { success: false, error: error.message };
  }
};

// Send login credentials to approved user
const sendLoginCredentials = async (userData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: userData.email,
      subject: 'Your KissanHelper Admin Account is Ready!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Welcome to KissanHelper Admin Panel!</h2>
          
          <p>Dear ${userData.name},</p>
          
          <p>Your admin registration has been approved! Your account is now ready to use.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Login Credentials:</h3>
            <p><strong>Username:</strong> ${userData.username}</p>
            <p><strong>Password:</strong> ${userData.password}</p>
            <p><strong>Login URL:</strong> <a href="${process.env.CLIENT_URL}/login">Click here to login</a></p>
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Important Security Notes:</h3>
            <ul>
              <li>Please change your password after first login</li>
              <li>Keep your credentials secure and don't share them</li>
              <li>No password reset option is available - contact admin if needed</li>
              <li>Your account has admin privileges - use responsibly</li>
            </ul>
          </div>
          
          <p>If you have any questions or need assistance, please contact the system administrator.</p>
          
          <p>Best regards,<br>KissanHelper Team</p>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This is an automated email from KissanHelper Admin System.
          </p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Login credentials email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending login credentials:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendRegistrationNotification,
  sendLoginCredentials
};