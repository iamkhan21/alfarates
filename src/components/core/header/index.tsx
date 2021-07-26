import { FunctionalComponent, h } from "preact";
import style from "./style.css";

const Header: FunctionalComponent = () => {
  return (
    <header className={`${style.header} siimple--bg-dark siimple--color-white`}>
      <h1 className={style.brand}>Rately</h1>
    </header>
  );
};

export default Header;
