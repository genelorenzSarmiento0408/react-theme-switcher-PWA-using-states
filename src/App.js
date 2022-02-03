import { useState } from "react";
import About from "./components/About";
import Options from "./components/Options";

function App() {
  const [theme, setTheme] = useState("");

  // setting the background-color
  let Bgcolor;
  let color;
  let colors = [
    { theme: "dark", Bgcolor: "#2f2f2f", textcolor: "white" },
    { theme: "red", Bgcolor: "#a14343", textcolor: "white" },
    { theme: "blue", Bgcolor: "#3d57eb", textcolor: "white" },
    { theme: "yellow", Bgcolor: "#d1cb11", textcolor: "#212121" },
    { theme: "indigo", Bgcolor: "#2d0159", textcolor: "white" },
  ];

  if (theme) {
    Bgcolor = theme;
    // mapping through the colors
    // eslint-disable-next-line array-callback-return
    colors.map((clr) => {
      // callback function
      if (clr.theme === theme) {
        console.log(clr.Bgcolor);
        Bgcolor = clr.Bgcolor;
        color = clr.textcolor;
      }
    });
  }
  const styles = {
    background: Bgcolor,
    // if color is truthy then color
    color: color ? color : "black",
  };

  return (
    <div style={styles} className="App">
      <div className="container">
        <About />
        <select
          onChange={(event) =>
            setTheme((prevTheme) => {
              return (prevTheme = event.target.value);
            })
          }
        >
          <Options />
        </select>
        <footer style={styles}>
          <p>Made with love by Gene Lorenz</p>With the help of Scrimba
        </footer>
      </div>
    </div>
  );
}

export default App;
