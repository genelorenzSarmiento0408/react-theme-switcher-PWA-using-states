import { useState } from "react";

export default function Form({ theme, setTheme }) {
  // ------------------------------------states------------------------------------------------------
  const [inputedTheme, setInputtedTheme] = useState("");
  const [error, setError] = useState("");

  // check if the input is a valid hex color
  const isHex = /(#?)[0-9a-fA-F]{6,8}/gm;

  function setThemeVal(event) {
    event.preventDefault();
    if (!inputedTheme.match(isHex)) {
      setError("Not a valid hex color");
      return;
    }
    setError("");
    setTheme(inputedTheme);
    console.log(theme);
    event.target.reset();
  }
  return (
    <>
      <form onSubmit={setThemeVal}>
        <input
          type="text"
          name="inputedTheme"
          value={inputedTheme}
          onChange={(e) => setInputtedTheme(e.target.value)}
        ></input>
        <br></br>
        <button className="btn">Set theme</button>
        <div className="error">{error}</div>
      </form>
    </>
  );
}
