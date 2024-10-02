import { useState } from 'react';
const basePath = import.meta.env.VITE_BASEPATH ?? "";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${basePath}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Password reset link sent to your email.');
      } else {
        alert('Error sending email. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="forgot-password-page">
      <h2 className="forgoth2">Forgot Password</h2>
      <form onSubmit={handleSubmit} className='forgothform'>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="forgotinput"
          required

        />
        <button type="submit" className="forgotbtn">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
