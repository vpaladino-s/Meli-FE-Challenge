const React, { useState, useContext } = require("react");
const SVG = require("react-inlinesvg");
const { AppContext } = require("../../contexts/provider");
const { Link } = require("react-router-dom");
const { config } = require(".././../../config");

// Style
const styles = require("./SearchBar.module.scss");

const lupa = require("../../assets/lupa.svg");
const logo = config.logoMELI;

function SearchBar() {
 
  const [value, setValue] = useState("");
  const [state, setQuery] = useContext(AppContext);

  // Ejecuta la busqueda del valor.
  const onClickHandler = (e) => {
    if ((e.type === "keypress" && e.key === "Enter") || e.type === "click") {
      setQuery({...state, query: value})
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.bar}>

        {/* Logo */}
        <Link to='/'>
          <img className={styles.logo} src={logo} alt="Logo de Mercado Libre" />
        </Link>

        {/* Input */}
        <input
          placeholder="Nunca dejes de buscar."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyPressCapture={onClickHandler}
        ></input>

        {/* Button */}
        <a onClick={onClickHandler} className={styles.button}>
          <div className={styles.centerIcon}>
            <SVG className={styles.icon} src={lupa} />
          </div>
        </a>
      </div>
    </header>
  );
}

export default SearchBar;