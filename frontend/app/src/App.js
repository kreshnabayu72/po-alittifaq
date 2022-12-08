import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrderPage from "./pages/OrderPage";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("login"))
  );

  const RequireAuth = ({ children, redirect }) => {
    return loggedIn ? children : <Navigate to={redirect} />;
  };

  return (
    <BrowserRouter>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <RequireAuth redirect="/login">
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={<LoginPage setLoggedIn={setLoggedIn} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/order/:nomor_po"
          element={
            <RequireAuth redirect="/login">
              <OrderPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
