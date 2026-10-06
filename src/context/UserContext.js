import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    const savedLogin = localStorage.getItem("loggedIn");
    return savedLogin === "true";
  });

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);

        const savedUserId = localStorage.getItem("selectedUserId");

        if (savedUserId) {
          const user = data.find(
            (user) => user.id === Number(savedUserId)
          );

          setSelectedUser(user);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

  const login = () => {
    setLoggedIn(true);

    if (users.length > 0) {
      const user = users[0];

      setSelectedUser(user);
      localStorage.setItem("selectedUserId", user.id);
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setSelectedUser(null);
    localStorage.removeItem("selectedUserId");
  };

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        users,
        selectedUser,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};