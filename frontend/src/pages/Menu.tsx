import React, { useEffect, useRef } from "react";
import {
  IonLabel,
  IonCol,
  IonRow,
  IonGrid,
  IonIcon,
  IonCheckbox,
  IonApp,
  IonTitle,
  IonHeader,
  IonToolbar,
} from "@ionic/react";
import Button from "../components/Button.tsx";
import styles from "./Menu.module.css";
import CSS from "csstype";
import Footer from "../components/Footer/Footer.tsx";
import Bug from "../images/thinBug.svg";
import Monitor from "../images/thinMonitor.svg";
import { useNavigate } from "react-router-dom";

const links = [
  'Vectors and icons by <a href="https://github.com/jtblabs/jtb-icons?ref=svgrepo.com" target="_blank">Jtblabs</a> in Logo License via <a href="https://www.svgrepo.com/" target="_blank">SVG Repo</a>',
  'Vectors and icons by <a href="https://github.com/Vectopus/Atlas-icons-font?ref=svgrepo.com" target="_blank">Vectopus</a> in MIT License via <a href="https://www.svgrepo.com/" target="_blank">SVG Repo</a>',
];

const Menu = () => {
  const navigate = useNavigate();

  const wikiButtonClick = () => {
    window.open("http://localhost:5173/wiki", "_self");
  };

  return (
    <IonApp>
      <IonGrid class={styles.grid}>
        <IonToolbar class={styles.toolbar}>
          <IonTitle class={styles.title}>Bug Hunt</IonTitle>
        </IonToolbar>
      </IonGrid>

      <IonGrid>
        <IonRow>
          <IonCol>
            <img
              className={styles.bugSpacing}
              src={Bug}
              style={{ width: 600, height: 600 }}
            ></img>
          </IonCol>
          <IonRow>
            <IonCol>
              {/* <div>
                 <h1>SVG Animation Example</h1>
                   <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" ref={svgRef}>
                     <MySvg  />
                  </svg>
                </div> */}
            </IonCol>

            <IonCol>
              <IonCol class={styles.row}>
                <IonRow>
                  <Button
                    class={styles.button}
                    onClick={() => navigate("/topics")}
                  >
                    {" "}
                    Activities{" "}
                  </Button>
                </IonRow>

                <IonRow>
                  <Button
                    class={styles.button}
                    onClick={() => alert("Daily puzzle button is clicked")}
                  >
                    {" "}
                    Daily puzzle{" "}
                  </Button>
                </IonRow>

                <IonRow>
                  <Button
                    class={styles.button}
                    onClick={() => navigate("/online-game")}
                  >
                    1 vs 1
                  </Button>
                </IonRow>

                <IonRow>
                  <Button
                    class={styles.button}
                    onClick={() => navigate("/forum")}
                  >
                    {" "}
                    Forum{" "}
                  </Button>
                </IonRow>

                <IonRow>
                  <Button
                    class={styles.button}
                    onClick={() => navigate("/custom-puzzles")}
                  >
                    {" "}
                    Player Created Puzzles{" "}
                  </Button>
                </IonRow>

                <IonRow>
                  <Button class={styles.button} onClick={wikiButtonClick}>
                    {" "}
                    WIKI{" "}
                  </Button>
                </IonRow>
              </IonCol>
            </IonCol>

            <IonCol></IonCol>
          </IonRow>

          <IonCol>
            <img
              className={styles.bugSpacing}
              src={Monitor}
              style={{ width: 600, height: 600 }}
            ></img>
          </IonCol>
        </IonRow>
      </IonGrid>

      {/* <Footer links={links} /> */}
    </IonApp>
  );
};

export default Menu;
