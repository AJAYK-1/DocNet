const ResetPasswordOTP = (name, otp) => 
    `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f3f4f6; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 40px;">
      <h2 style="color: #dc3545;">DocNet Password Reset</h2>
      <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
      <p style="font-size: 16px;">
        We received a request to reset your password. Please use the OTP below to proceed:
      </p>
      <div style="font-size: 32px; font-weight: bold; color: #dc3545; margin: 20px 0;">
        ${otp}
      </div>
      <p style="font-size: 16px;">This OTP is valid for <strong>5 minutes</strong>.</p>
      <p style="font-size: 16px;">
        If you didn’t request this, please ignore this email or contact our support team immediately.
      </p>
      <p style="margin-top: 30px; font-size: 16px;">
        Stay safe,<br>
        <strong>The DocNet Team</strong>
      </p>
    </div>
  </div>
`;

module.exports = {ResetPasswordOTP};
