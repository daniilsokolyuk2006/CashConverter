import logo from '../assets/logo.png'
import { useState } from 'react'
import { useTranslation } from 'react-i18next';

export default function Header ({scrollToTarget}) {
// const [showHelp, setShowHelp] = useState(false);
    const { i18n,t } = useTranslation();
    const [lngChoosen, setlngChoosen] = useState("EN");

    function lngChangeHandler(lng) {
        if(lng == "EN") {
            i18n.changeLanguage("en")
        } else if(lng == "RU") {
            i18n.changeLanguage("ru")
        } else {
            i18n.changeLanguage("pl")
        }
        setlngChoosen(lng);
    }

    return (
        <>
        <div id="header-wrapper">
            <div id="header">
                <div className='logo'>
                    <img src={logo} alt='logo' id="logo-img"></img>
                    <h1 id="label">KantorX</h1>
                </div>
                
                <div className='navigation'>
                    {/* <button className='nav-btn' onClick={() => setShowHelp(!showHelp)}>Help</button> */}
                    {/* {showHelp && (<div>
                        Some text.
                    </div>)} */}
                    <button className='nav-btn' onClick={() => scrollToTarget()}>{t("charts")}</button>
                    <div className='languages'>
                    <h3>Lang:</h3>
                    <button className={`nav-btn ${lngChoosen == "EN" ? "choosen" : ""}`} onClick={() => lngChangeHandler("EN")} >EN</button>
                    <button className={`nav-btn ${lngChoosen == "RU" ? "choosen" : ""}`} onClick={() => lngChangeHandler("RU")}>RU</button>
                    <button className={`nav-btn ${lngChoosen == "PL" ? "choosen" : ""}`} onClick={() => lngChangeHandler("PL")}>PL</button>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
}