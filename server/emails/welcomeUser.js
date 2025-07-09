const WelcomeMailUser = (username) => 
    `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 30px;">
    <div style="
      max-width: 600px;
      margin: auto;
      border-radius: 10px;
      overflow: hidden;
      background-image: url('https://www.shutterstock.com/shutterstock/videos/1055307554/thumb/1.jpg?ip=x480');
      background-size: cover;
      background-position: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    ">
      <div style="background-color: rgba(255, 255, 255, 0.92); padding: 40px;">
        <h2 style="color: rgb(0, 0, 0); margin-bottom: 20px;">
          Welcome to <span style="color: rgb(5, 120, 133);">DocNet</span>!
        </h2>
        <p style="font-size: 16px;">Dear <strong>${username}</strong>,</p>
        <p style="font-size: 16px;">Thank you for registering with DocNet.</p>
        <p style="font-size: 16px;">You can now:</p>
        <ul style="font-size: 16px; padding-left: 20px;">
          <li>✅ Book appointments with top doctors</li>
          <li>✅ Manage your health profile</li>
          <li>✅ View prescriptions and appointment history</li>
        </ul>
        <p style="font-size: 16px;">If you have questions, contact us at 
          <a href="mailto:ajaykumartp10@gmail.com" style="color: #007bff;">support@docnet.com</a>.
        </p>
        <p style="margin-top: 30px; font-size: 16px;">
          Stay healthy,<br />
          <strong>The DocNet Team</strong>
        </p>
      </div>
    </div>
  </div>
  `

module.exports = { WelcomeMailUser }