import { Fragment, FunctionalComponent, h } from "preact";
import Header from "./header";
import Main from "./main";
import { Provider } from "unistore/preact";
import { store } from "@store/index";

const App: FunctionalComponent = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <Header />
        <Main />
        <footer>
          <small>
            Створана{" "}
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
    </Provider>
  );
};

export default App;
