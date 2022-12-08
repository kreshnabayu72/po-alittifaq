import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ loggedIn, setLoggedIn }) {
  const nav = useNavigate();

  const LogoutHandler = (e) => {
    localStorage.removeItem("login");
    alert("Logout");
    setLoggedIn(null);
  };
  if (!loggedIn)
    return (
      <nav>
        <h1>
          <Link to="/">Home</Link>
        </h1>
        <h4>
          <Link to="/login">Login</Link>
        </h4>
      </nav>
    );
  else {
    return (
      <nav>
        <h1>
          <Link to="/">Home</Link>
        </h1>
        <h4>
          <Link onClick={(e) => LogoutHandler(e)}>Logout</Link>
        </h4>
      </nav>
    );
  }
}

export default Navbar;
