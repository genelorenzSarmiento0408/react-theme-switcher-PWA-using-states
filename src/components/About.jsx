export default function About({ color }) {
  return (
    <div>
      <h1 className="title">Mini Solo Project: GLS Theme Switcher</h1>
      <h3>The current color is: {color}</h3>
      <p>
        About the theme Switcher. Theme Switcher is created by Gene Lorenz
        Sarmiento in React using states and Forms
      </p>
      <p>
        The GLS Theme Switcher can change the theme based on how you select it
        on the dropdown menu
      </p>
      <p>Just Select it in the dropdown menu</p>
    </div>
  );
}
