import { useEffect, useState, useMemo } from "react";
import About from "./components/About";
import Footer from "./components/Footer";
import Form from "./components/Form";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [styles, setStyles] = useState({
    backgroundColor: "",
    color: "",
  });
  let colors = useMemo(() => {
    return [
      { theme: "dark", Bgcolor: "#2f2f2f", textcolor: "white" },
      { theme: "red", Bgcolor: "#a14343", textcolor: "white" },
      { theme: "blue", Bgcolor: "#3d57eb", textcolor: "white" },
      { theme: "yellow", Bgcolor: "#d1cb11", textcolor: "#212121" },
      { theme: "indigo", Bgcolor: "#2d0159", textcolor: "white" },
      { theme: "green", Bgcolor: "#0f9b0f", textcolor: "white" },
    ];
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    // if the theme is text-based, transform it into hex code.
    colors.forEach((color) => {
      if (theme === color.theme) {
        setTheme(color.Bgcolor);
      }
    });
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
          color: "#151515",
        });
      }
      setStyles({
        backgroundColor: theme,
        color: "#ffffff",
      });
    });
  }, [theme, colors]);

  useEffect(() => {
    document.body.style.backgroundColor = styles.backgroundColor;
    document.body.style.color = styles.color;
  }, [styles]);
  return (
    <div className="App">
      <div className="container">
        <About color={theme} />
        <select onChange={(e) => setTheme(e.target.value)}>
          <option value="#FFFFFF">-- Choose --</option>
          {colors.map((color) => (
            <option key={color.theme} value={color.theme}>
              {color.theme}
            </option>
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
        <Form theme={theme} setTheme={setTheme} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
