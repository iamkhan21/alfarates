import { createContext, FunctionalComponent, h } from "preact";
import style from "./style.css";
import { lazy, Suspense } from "preact/compat";
import { ServicesContext,instance } from "../../contexts";

const Converter = lazy(() => import("@components/main/converter"));

const Home: FunctionalComponent = () => {
  return (
    <article className={style.home}>
      <p className={style.description}>
        <b>TodayRate</b> is the place where you can check currency rate in
        Belarus. We get data from the Alfa Bank API. The project itself is made
        with Preact.
      </p>
      <Suspense fallback={<div>loading...</div>}>
        <ServicesContext.Provider value={instance}>
          <Converter />
        </ServicesContext.Provider>
      </Suspense>
    </article>
  );
};

export default Home;
