const WelcomeMailDoctor = (docname) => 
    `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; background: #f9f9f9; padding: 30px;">
    <div style="
      max-width: 600px;
      margin: auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      background-image: url('https://static.vecteezy.com/system/resources/previews/020/292/518/original/single-continuous-line-drawing-of-young-happy-male-doctor-giving-warm-welcome-greeting-gesture-to-the-patients-medical-health-care-service-workers-concept-one-line-draw-design-illustration-vector.jpg');
      background-size: cover;
      background-position: center;
    ">
      <div style="background: rgba(255, 255, 255, 0.9); padding: 40px;">
        <h2 style="color: #2c3e50;">Welcome to <span style="color: #007bff;">DocNet</span>, Dr. ${docname}!</h2>
        <p>We're thrilled to have you join our network of dedicated healthcare professionals.</p>
        <p>With DocNet, you can:</p>
        <ul>
          <li>📅 Manage appointments seamlessly</li>
          <li>📝 Access and update patient records</li>
          <li>📢 Connect with patients faster and better</li>
        </ul>
        <p>Thank you for choosing to serve with us.</p>
        <p>If you have any questions or need assistance, feel free to contact our team at 
          <a href="mailto:ajaykumartp10@gmail.com">support@docnet.com</a>.
        </p>
        <p style="margin-top: 30px;">
          Sincerely,<br>
          <strong>The DocNet Team</strong>
        </p>
      </div>
    </div>
  </div>
`;


module.exports = { WelcomeMailDoctor }