"use client";

import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(window.localStorage.getItem("theme") ?? "light");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
};

const Link = ({ href, text }) => {
  const { theme } = useContext(themeContext);

  return (
    <a href={href} className={theme}>
      {text}
    </a>
  );
};

const Header = () => {
  return (
    <div>
      <p>Mon header</p>
      <Link href="/test" text="a" />
      <Link href="/test" text="a" />
      <Link href="/test" text="a" />
      <Link href="/test" text="a" />
    </div>
  );
};

const ThemeDisplay = () => {
  const { theme } = useContext(themeContext);
  return <p>Mon thème: {theme}</p>;
};

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(themeContext);
  if (!theme) {
    return null;
  }

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value={null}></option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
};

export default function Page() {
  return (
    <ThemeProvider>
      <div>
        <ThemeDisplay />
        <ThemeSwitcher />
        <Header />
      </div>
    </ThemeProvider>
  );
}
