"use client";

import { createContext, useContext, useState } from "react";

const authContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);

  const logout = () => setIsAuthenticated(false);

  return (
    <authContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

function NavBar() {
  const { isAuthenticated, logout } = useContext(authContext);

  return (
    <nav>
      {isAuthenticated && (
        <button className="link" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
}

function LoginForm() {
  const { login } = useContext(authContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    login(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          required
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          required
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
        />
      </div>
      <button className="primary" type="submit">
        Login
      </button>
    </form>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}

function Main() {
  const { isAuthenticated } = useContext(authContext);

  return <main>{isAuthenticated ? <Dashboard /> : <LoginForm />}</main>;
}

export default function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Main />
    </AuthProvider>
  );
}
