import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);
  const styles = {
    background: isDark ? "#2f2f2f" : "transparent",
    color: isDark ? "white" : "black",
    paddingTop: "1em",
  };
  return (
    <div style={styles} className="App">
      <h1>Theme Switcher</h1>
      <button onClick={() => setIsDark((prevTheme) => !prevTheme)}>
        Turn to {isDark ? "light" : "dark"} mode
      </button>
    </div>
  );
}

export default App;
