import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [input, setInput] = useState({});

  const nav = useNavigate();

  const SubmitHandler = async (e) => {
    try {
      if (input.password != input.confirmPassword) {
        throw new Error("Password didnt match");
      }
      e.preventDefault();
      console.log("submit");

      const formData = new FormData();
      formData.append("fullName", input.fullName);
      formData.append("username", input.username);
      formData.append("password", input.password);

      const result = await axios.post("/api/user", formData);
      console.log(result);
      alert("successfully registered");
      nav("/login");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  return (
    <div>
      <h4>Register</h4>
      <form onSubmit={(e) => SubmitHandler(e)}>
        <input
          type="text"
          name="name"
          placeholder="enter your name..."
          onChange={(e) => setInput({ ...input, fullName: e.target.value })}
        />
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
        <input
          type="password"
          name="password"
          placeholder="confirm password..."
          onChange={(e) =>
            setInput({ ...input, confirmPassword: e.target.value })
          }
        />
        <input type="submit" value="Submit" />
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default RegisterPage;
