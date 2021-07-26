import { Fragment, FunctionalComponent, h } from "preact";
import Header from "./header";
import Main from "./main";

const App: FunctionalComponent = () => {
  return (
      <Fragment>
        <Header />
        <Main />
        <footer>
          <small>
            Created by {" "}
            <a
              href="https://www.8byte.agency"
              target="_blank"
              rel="noopener noreferrer"
            >
              8byte Agency
            </a>
          </small>
        </footer>
      </Fragment>
  );
};

export default App;
