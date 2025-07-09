const LoginOTP = (name, otp) =>
    `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f3f4f6; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 40px;">
      <h2 style="color: #056c75;">DocNet OTP Verification</h2>
      <p style="font-size: 16px;">Dear <strong>${name}</strong>,</p>
      <p style="font-size: 16px;">Your OTP for login is: </p>
      <div style="font-size: 32px; font-weight: bold; color: #056c75; margin: 20px 0;">
        ${otp}
      </div>
      <p style="font-size: 16px;">This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
      <p style="font-size: 16px;">If you didn’t request this OTP, please ignore this email or contact our support team.</p>
      <p style="margin-top: 30px; font-size: 16px;">
        Stay secure,<br>
        <strong>The DocNet Team</strong>
      </p>
    </div>
  </div>
`;

module.exports = {LoginOTP};
