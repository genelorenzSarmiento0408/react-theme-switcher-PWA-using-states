import { useEffect, useState } from "react";
import About from "./components/About";
import Options from "./components/Options";

function App() {
  // ------------------------------------states------------------------------------------------------
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "");
  const [themeHex, setThemeHex] = useState("");
  const [error, setError] = useState("");
  // check if the input is a valid hex color
  const isHex = /#[0-9A-F]{6}/i;

  function setThemeVal(event) {
    event.preventDefault();
    if (!themeHex.match(isHex)) {
      setError("Not a valid hex color");
      return;
    }
    setError("");
    setTheme((prevHexTheme) => (prevHexTheme = themeHex));
  }
  // setting the background-color
  let Bgcolor;
  let color;
  let colors = [
    { theme: "dark", Bgcolor: "#2f2f2f", textcolor: "white" },
    { theme: "red", Bgcolor: "#a14343", textcolor: "white" },
    { theme: "blue", Bgcolor: "#3d57eb", textcolor: "white" },
    { theme: "yellow", Bgcolor: "#d1cb11", textcolor: "#212121" },
    { theme: "indigo", Bgcolor: "#2d0159", textcolor: "white" },
    { theme: "green", Bgcolor: "#0f9b0f", textcolor: "white" },
  ];

  useEffect(() => {
    localStorage.setItem("theme", theme);
    // every change of theme
  }, [theme]);
  if (theme) {
    Bgcolor = theme;
    // mapping through the colors
    // eslint-disable-next-line array-callback-return
    colors.map((clr) => {
      // callback function
      if (clr.theme === theme) {
        Bgcolor = clr.Bgcolor;
        color = clr.textcolor;
      }
    });

    if (theme.match(/\B#(\w+)[0-5]/)) {
      color = "white";
    }
  }
  const styles = {
    background: Bgcolor,
    // if color is truthy then color
    color: color ? color : "black",
  };

  return (
    <div style={styles} className="App">
      <div className="container">
        <About color={theme} />
        <select
          onChange={(event) =>
            setTheme((prevTheme) => {
              return (prevTheme = event.target.value);
            })
          }
        >
          <Options />
        </select>
        <br />
        <button
          onClick={() => {
            let random = Math.floor(Math.random() * colors.length);
            return setTheme(colors[random].theme);
          }}
          className="btn btn-primary"
        >
          Get random Theme :D
        </button>
        <br />
        Customize Color
        <form onSubmit={setThemeVal}>
          <input
            type="text"
            name="themeHex"
            value={themeHex}
            onChange={(event) => setThemeHex(event.target.value)}
          ></input>
          <br></br>
          <button className="btn">Set theme</button>
          <div className="error">{error}</div>
        </form>
        <footer style={styles}>
          Made with love by Gene Lorenz <br></br>
          <div className="small-none">With the help of Scrimba</div>
        </footer>
      </div>
    </div>
  );
}

export default App;
