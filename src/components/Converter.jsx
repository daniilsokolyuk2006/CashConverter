import { useEffect, useState } from "react";
import { fetchRates } from "../services/ExchangeApi";
import swapArrow from "../assets/swapArrows.png";
import downArrow from "../assets/down-arrow.png";
import euIcon from "../assets/Flag_of_Europe.png";
import globeIcon from "../assets/eflag.png";
import { useTranslation } from "react-i18next";


export default function Converter() {
    const FLOAT_INPUT_PATTERN = new RegExp ("^\\d*(\\.\\d{0,2})?$");

    const [amount, setAmount] = useState("");
    const [from, setFrom] = useState(() => {
        return localStorage.getItem("fromVal") || "PLN"
    });
    const [to, setTo] = useState(() => {
        return localStorage.getItem("toVal") || "EUR"
    });
    const [result, setResult] = useState("0.00");
    const [lastUpdateDate, setLastUpdateDate] = useState("");

    const [isSpinning, setIsSpinning] = useState(false);

    const [rates, setRates] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { i18n,t } = useTranslation();


    //localStorage: сохраниение для параметров в конвертере
    useEffect (() => {
        localStorage.setItem("fromVal", from);
        localStorage.setItem("toVal", to);
    }, [from,to])



    //flags___________________________________________________________________

    const POPULAR_CURRENCIES = {
        USD: "US",
        // EUR: "EU", // спец-кейс
        RUB: "RU",
        PLN: "PL",
        UAH: "UA",
        GBP: "GB",
        JPY: "JP",
        CHF: "CH",
        AUD: "AU",
        CAD: "CA",
    };


    function getCurrencyIcon (currency) {
        if (currency === "EUR") {
            return {
                type: "eu"
            }
        }

        if(POPULAR_CURRENCIES[currency]) {
            return {
                type : "flag",
                code : POPULAR_CURRENCIES[currency]
            }
        }

        return {
            type : "globe"
        }
    }

    // console.log(`CURRENCIES OBJECT : ${currencies}`);

    function getIconEl(currency) {
        const icon = getCurrencyIcon(currency);

        if (icon.type === "flag") {
            return (
                <img
                    className="cur-flag"
                    src={`https://flagcdn.com/${icon.code.toLowerCase()}.svg`}
                    alt={currency}
                    width={100}
                    height={100}
                />
            )
        }

        if (icon.type === "eu") {
            return <img
            className="eur-cur"
            src={euIcon}
            alt={currency}
            />
        }

        return <img 
        className="globe-cur"
        src={globeIcon}
        alt={currency}
        />
    }

    //________________________________________________________________________

    const swapAnimation = () => {
        setIsSpinning(true);

        setTimeout(() => {
          setIsSpinning(false)  
        }, 400);
    }

// loading rates from API (ExchcangeRate-API)
    useEffect(() => {
        async function loadRates() {
            try {
                setLoading(true);
                setError(null);
                

                const data = await fetchRates("RUB");
                setRates(data.rates);
                setLastUpdateDate(data.date);
            } catch (err) {
                setError(err.message || "Error on loading currency rates");
            } finally {
                setLoading(false);
            }
            
        }

        loadRates();
    }, [] );

    // форматирование даты для конвертера с Exchange-API 

    const formattedUpdateDate = new Date(lastUpdateDate).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });


    const handleChange = (e) => {
        let val = e.target.value;


        if (!FLOAT_INPUT_PATTERN.test(val)) return;

        setAmount(val);

        if(val==="") {
            setResult("0.00");
            return;
        }

    };

    useEffect(()=> {

        if(amount== "") return;

        const valToNumber = parseFloat(amount);
        const newResult = valToNumber * (rates[to] / rates[from]);
        setResult(newResult.toFixed(2));
    }, [from, to, amount, rates]);

    const handleSwap = () => {
        const currencyTemp = from;
        const amountTemp = amount;

        setFrom(to);
        setTo(currencyTemp);
        setAmount(result);
        setResult(amountTemp);

        swapAnimation();
    }




    if(loading) {
        return <div className="converter-wrapper">
            <div className="converter-card">
                <p>Currency loading...</p>
            </div>
        </div> 
    }

    if(error) {
        return <div className="converter-wrapper">
            <div className="converter-card">
                <p style={{color: "red"}}>{error}</p>
            </div>
        </div>   
    }

    if (!rates) {
        return null;
    }


    return(
        <>
        <div className="converter-wrapper">
        <div className="converter-card">
            <div className="converter-card-inner">
            
                <div className="conv-input-wrapper">
                    <label htmlFor="fromAmount">{t("from")}</label>
                    <div className="input-selector-wrapper">
                            <input 
                            id="fromAmount"
                            className="currency-input"
                            type="text" 
                            inputMode="decimal" 
                            value={amount}
                            onChange={handleChange} 
                            placeholder="0.00"
                             />

                             <select value={from} onChange={(e) => setFrom(e.target.value)}>
                                {Object.keys(rates).map((currency) => (
                                    <option 
                                    key={currency} 
                                    value={currency}
                                    >

                                        {currency}

                                    </option>
                                ))}

                             </select>
                             {getIconEl(from)}
                    </div>
                    

                </div>

                <button className={`swap-btn ${isSpinning ? "rotate" : ""}`} onClick={handleSwap}><img className="icon" src={swapArrow}></img></button>

                <div className="conv-input-wrapper">
                    <label htmlFor="toAmount">{t("to")}</label>
                    <div className="input-selector-wrapper">
                            <input
                            id="toAmount"
                            className="currency-input" 
                            type="text" 
                            inputMode="decimal"
                            value={result ==="" ? "" : result}
                            placeholder="0.00"
                            readOnly
                        />
                        <select value={to} onChange={(e) => setTo(e.target.value)}>
                                    {Object.keys(rates).map((currency) => (
                                        <option 
                                        key={currency} 
                                        value={currency}
                                        >

                                            {currency}
                                            
                                        </option>
                                    ))}

                                </select>
                                {getIconEl(to)}
                    </div>
                    
                </div>
                
            </div>
                
                <p className="secondary-info ">Rates updated: {formattedUpdateDate} </p>

        </div>
        
        </div>
        <div className="downarrowIcon"> <img className="downarrowIconImg" src={downArrow}  alt="interface icon"></img></div>
        </>
    )
}