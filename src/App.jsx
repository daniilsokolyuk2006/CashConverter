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

function App() {
  const [target, setTarget] = useState("USD");
  const [base, setBase] = useState("EUR");
  const [days, setDays] = useState(30);

  const targetRef = useRef(null);
  


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
    texts = {[`Managing money accurately is essential in today’s world. Whether you are traveling, shopping online, or working with international clients, knowing the exact value of your money helps you make better decisions. \n\nCurrency rates change every day, and even small differences can affect your budget. Our service helps you calculate and convert money quickly and easily. With a clear interface and up-to-date rates, you always know how much you are spending or receiving. This saves time, reduces mistakes, and gives you confidence when dealing with different currencies.`]} 
    cardTitles = {["Convert and Calculate..."]}
    media = {graficsVid}
    />
    </VievportAnim>
    
    <VievportAnim>
    <ContentBlock
    background = {"primary"}
    texts = {["Our converter guarantees up-to-date and precise exchange rates in real time. You can always be confident that your calculations reflect the latest market changes. This helps avoid mistakes and saves time when managing your finances.",
    "The interface of our service is simple and intuitive. Even beginners can quickly convert currencies without extra steps. Everything you need is in one window, with no cluttered menus or complicated settings. ", 
    "The converter works instantly without delays and supports all popular currencies. You can use it on any device, whether it’s a computer or a smartphone. It’s a reliable tool for travel, online shopping, and business transactions."]}
    cards = {3}
    cardTitles = {["Data Accuracy","User-Friendly Interface","Fast and Reliable"]}
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
