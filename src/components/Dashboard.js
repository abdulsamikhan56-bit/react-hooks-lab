import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ThemeContext } from "../context/ThemeContext";
import "../App.css";

const Dashboard = () => {
  const {
    loggedIn,
    selectedUser,
    login,
    logout,
  } = useContext(UserContext);

  const {
    theme,
    toggleTheme,
  } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <div className="container">

        <h1>React Hooks Lab</h1>

        <div className="card">
          <h2>User Authentication</h2>

          {loggedIn ? (
            <>
              <p className="success">
                You are logged in.
              </p>

              {selectedUser && (
                <div>
                  <p>
                    <strong>User Name:</strong>{" "}
                    {selectedUser.name}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {selectedUser.email}
                  </p>

                  <p>
                    <strong>City:</strong>{" "}
                    {selectedUser.address.city}
                  </p>
                </div>
              )}

              <button
                className="logout-btn"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <p>You are currently logged out.</p>

              <button
                className="login-btn"
                onClick={login}
              >
                Login
              </button>
            </>
          )}
        </div>

        <div className="card">
          <h2>Theme Switching</h2>

          <p>
            Current Theme:
            <strong> {theme}</strong>
          </p>

          <button
            className="theme-btn"
            onClick={toggleTheme}
          >
            Switch to{" "}
            {theme === "light" ? "Dark" : "Light"} Theme
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;