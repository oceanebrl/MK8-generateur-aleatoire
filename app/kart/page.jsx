import Gallery from "../components/kart/Gallery";

import styles from "../styles/pages/kart.module.scss";
import optionStyle from "../styles/modules/optionStyle.module.scss";

import { kartLists } from "@/datas/kartList";
import { wheelsList } from "@/datas/wheelList";
import { glidersList } from "@/datas/gliderList";

import OptionBtn from "../components/OptionBtn";

function Karts() {
  return (
    <main>
      <h2>Choisis la composition de ton véhicule</h2>
      <section className={styles.pageWrap}>
        <div className={optionStyle.option}>
          <div className={optionStyle.option__btn}>
            <OptionBtn name="Choisis pour moi !" />
            <OptionBtn name="Reset" />
          </div>
          <div>Futur compo à afficher ici</div>
        </div>
        <div className={styles.galleryWrap}>
          <Gallery itemList={kartLists} />
          <Gallery itemList={wheelsList} />
          <Gallery itemList={glidersList} />
        </div>
      </section>
    </main>
  );
}

export default Karts;
