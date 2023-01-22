import "./registration.scss";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { MdOutlineMailOutline } from "react-icons/md";
function Registeration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("http://localhost:3001/users/register", { name, email, password });
      setError("");
      history.push("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  // if (isLoggedIn) {
  //   return <Redirect to='/login' />
  // }

  return (
    <div className="registration">
      <div className="registration_container">
        <form onSubmit={handleSubmit}>

          <h1>Create Account</h1>
          <div className="input_box">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="name" className="label-name">Name</label>
            <MdOutlineMailOutline className="input_icons" />
          </div>
          <div className="input_box">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email" className="label-name">Email Address</label>
            <MdOutlineMailOutline className="input_icons" />
          </div>
          <div className="input_box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password" className="label-name">Email Address</label>
            <MdOutlineMailOutline className="input_icons" />
          </div>

          {error && <p>{error}</p>}
          <button type="submit" disabled={isLoading} className="inputbox btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registeration;
