import "./registration.scss";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Registeration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:8000/users/register", { name, email, password });
      setError("");
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
        <form onSubmit={handleSubmit}>
          <h2>Register and Inprove your Workflow</h2>
          <div className="input-div">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Name"
            />
            {/* <label htmlFor="email" className="">Email Address</label> */}
          </div>
          <div className="input-div">
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
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
          <div className="border-div">
            <span>Already User of DocAI?</span> 
            <span> 
                <Link to ="/login">Sign In</Link>
            </span> 
          </div>
        </form>
  );
}

export default Registeration;
