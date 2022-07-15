import { useEffect, useState } from "react";
import About from "./components/About";
import Options from "./components/Options";

function App() {
  // ------------------------------------states------------------------------------------------------
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "");
  const [themeHex, setThemeHex] = useState("");
  const [error, setError] = useState("");
  const [styles, setStyles] = useState({
     background: "white",
     color: "black"
  })
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
    async function isContrast() {
      const res = await fetch(
        `https://webaim.org/resources/contrastchecker/?fcolor=151515&bcolor=${theme.replace(
          "#",
          "",
        )}&api`,
      );
      const data = await res.json();
      return data.AA;
    }
    isContrast().then((res) => {
      if (res === "pass") {
        return setStyles({
            backgroundColor: theme,
            color: "#151515"
        })
      }
      return setStyles({
            backgroundColor: theme,
            color: "#ffffff"
      })
    });
  }, [theme]);
  if (theme) {
    Bgcolor = theme;
    // mapping through the colors
    // eslint-disable-next-line array-callback-return
    colors.map((clr) => {
      // callback function
      if (clr.theme === theme) {
        Bgcolor = clr.Bgcolor;
        color = clr.textcolor 
      }
    });
  }
  // setStyles({
  //  background: Bgcolor,
    // if color is available then set the color
   // color: color ? color : "black",
  // })

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
          <option value="">-- Choose --</option>
          {colors.map((color) => (
            <Options key={color.theme} color={color.theme} />
          ))}
        </select>
        <br />
        <button
          onClick={() => {
            // pick out a random color, in hex
            let random =
              "#" + (Math.random() * 0xffffff).toString(16).slice(0, 6);
            return setTheme(random);
          }}
          className="btn btn-primary"
        >
          Get random Theme :D
        </button>
        <br />
        Customize Color using hexadecimal code: (it would NOT work if it is not
        a hexcode)
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
          With the help of Scrimba and Ate <a href="https://github.com/Medic1111">Medic Pagano</a>
        </footer>
      </div>
    </div>
  );
}

export default App;
