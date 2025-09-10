import "../../styles/signup.css";
export default function SignupPage() {
  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="signup-title">Create Account</h1>
        <form className="signup-form">
          <input type="text" placeholder="Name" className="input-field" />
          <input type="email" placeholder="Email" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
