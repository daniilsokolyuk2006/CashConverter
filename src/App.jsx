import Header from "./components/Header";
import ConverterBlock from "./components/ConverterBLock";
import './styles/app.css';
import ContentBlock from "./components/ContentBlock";
import graficsVid from "./assets/graficsVid.mp4";
import VievportAnim from "./components/VeivportAnim";
import CurrnecyCharts from "./components/CurrencyCharts";
import { useState, useRef} from "react";
import CurrencyFilter from "./components/CurrencyFilter";
import Footer from "./components/Footer";
import { useTranslation } from "react-i18next";

function App() {
  const [target, setTarget] = useState("USD");
  const [base, setBase] = useState("EUR");
  const [days, setDays] = useState(30);

  const targetRef = useRef(null);
  
  const {i18n, t} = useTranslation();

  function scrollToTarget() {
    targetRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };
   


  return (
    <>

    <Header
    scrollToTarget={scrollToTarget}
    />

    <ConverterBlock/>

    {/* Орабатываемые параметры ContentBlock : texts, cardTitles, media, background, cards icons(скопировать лишь класс).*/}
    <VievportAnim>
    <ContentBlock
    cards = {1}
    texts = {[t("firstBlockText")]} 
    cardTitles = {[t("convAndCalcTitle")]}
    media = {graficsVid}
    />
    </VievportAnim>
    
    <VievportAnim>
    <ContentBlock
    background = {"primary"}
    texts = {[
    t("dataAcurracyText"),
    t("user-FriendyInterfaceText"), 
    t("fastAndReliableText")
  ]}
    cards = {3}
    cardTitles = {[t("dataAccuracyTitle"),t("user-FriendlyInterfaceTitle"),t("fastAndReliableTitle")]}
    icons={["fi fi-ts-vision-target","fi fi-ts-followers","fi fi-rr-time-check"]}
    />
    </VievportAnim>

    <div ref={targetRef}> 
    <CurrnecyCharts
      base = {base}
      target = {target}
      days = {days}
      >

      <CurrencyFilter
      base={base} 
      setBase={setBase} 
      target = {target} 
      setTarget ={setTarget}
      days = {days}
      setDays={setDays} />

      </CurrnecyCharts>
      </div>

      <Footer/>
    
    
    </>
  )
}

export default App
