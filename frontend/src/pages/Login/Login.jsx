import "./login.scss";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/users/login", { email, password });
      console.log(res.data.token);
      // setUser(data.user);
      localStorage.setItem("token", res.data.token);
      // console.log(data.token);
      navigate("/dashboard")
      console.log("line reached")
    } catch (err) {
      console.log("error is present")
      setError(err);
      console.log(err)
    } finally {
      console.log("came out of the error hell")
      setIsLoading(false);
      console.log("done")
    }
  };


  return (
        <form onSubmit={handleSubmit}>
          <h2>Welcome Back!</h2>
          <div className="input-div">
            {/* <label htmlFor="email" className="">Email Address</label> */}
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* <MdOutlineMailOutline className="input_icons" /> */}

          </div>
          <div className="input-div">
            {/* <label htmlFor="password" className="">Password</label> */}
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* <BsKey className="input_icons" /> */}
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={isLoading} className="btn">
            {isLoading ? "Loading..." : "Login"}
          </button>
          <div className="border-div">
            <span>Are you new to DocAI?</span> 
            <span> 
                <Link to ="/register">Sign Up</Link>
            </span> 
          </div>
        </form>
  );
}

export default Login;
