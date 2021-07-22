import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import { Route, Router } from "preact-router";
import Home from "@routes/home";
import NotFoundPage from "@routes/notfound";

const Main: FunctionalComponent = () => {
  return (
    <main className={style.main}>
      <Router>
        <Route path="/" component={Home} />
        <NotFoundPage default />
      </Router>
    </main>
  );
};

export default Main;
