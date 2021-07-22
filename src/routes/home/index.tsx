import { FunctionalComponent, h } from "preact";
import style from "./style.css";
import Converter from "@components/main/converter";
import { connect } from "unistore/preact";
import { actions } from "@store/index";
import { useEffect } from "preact/hooks";

interface Props {
  loadRates: () => void;
}

const Home: FunctionalComponent<Props> = ({ loadRates }: Props) => {
  useEffect(() => {
    loadRates();
  }, []);
  return (
    <article className={style.home}>
      <p>
        <b>TodayRate</b> is the place where you can check currency
        rate in Belarus. We get data from the Alfa Bank API. The project itself is
        made with Preact.
      </p>
      <Converter />
    </article>
  );
};

// @ts-ignore
export default connect([], actions)(Home);
