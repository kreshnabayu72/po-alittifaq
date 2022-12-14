import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage({ setLoggedIn }) {
  const [input, setInput] = useState({});
  const nav = useNavigate();
  const SubmitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log("submit");

      const formData = new FormData();
      formData.append("username", input.username);
      formData.append("password", input.password);

      const result = await axios.post("/api/user/login", formData);
      localStorage.setItem("login", JSON.stringify(result.data.login));
      alert("successfully login");
      nav("/");
      setLoggedIn(result.data.login);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  return (
    <div>
      <h4>Login</h4>
      <form onSubmit={(e) => SubmitHandler(e)}>
        <input
          type="text"
          name="username"
          placeholder="enter username..."
          onChange={(e) => setInput({ ...input, username: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="enter password..."
          onChange={(e) => setInput({ ...input, password: e.target.value })}
        />
        <input type="submit" value="Submit" />
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default LoginPage;
