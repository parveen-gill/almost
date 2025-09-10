import "../../styles/login.css";
import Link from "next/link";
export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
         <h1>Login</h1>
        <p>
  Don't have an account?{" "}
  <Link style={{textDecoration:'none'}} href="/signup">
    <span>Sign up</span>
  </Link>
</p>

      <form>
        <input type="email" placeholder="Email" /><br/>
        <input type="password" placeholder="Password" /><br/>
        <p style={{textAlign:"end",cursor:"pointer"}}>Forgot Password ?</p>
        <button type="submit">Login</button>
      </form>
      </div>
     
    </div>
  );
}
    