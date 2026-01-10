
export default function CurrencyFilter ({base, setBase, target, setTarget, days, setDays}) {
    const currencies = ["USD", "EUR", "PLN", "GBP", "JPY"];
    const periods = [
        {label : "1W", days:7},
        {label: "1M", days:30},
        {label : "3M", days: 90},
        {label : "1Y", days: 365}
    ]

    function filterChangeHandler (newBase) {
        let newTarget = newBase === "USD" ? "EUR" : "USD";

        setBase(newBase);
        setTarget(newTarget);

        
    }

    console.log(days, typeof days);


    return(
        <>
        <div>
             {currencies.map(cur => (
                <button className={`chart-btn ${base==cur ? "active" : ""}`} key={cur} onClick={() => filterChangeHandler(cur)}>
                    {cur}
                </button>
             ))}
        </div>
        
        <div>
            {periods.map(p => (
                <button className={`chart-btn ${days === p.days ? "active" : ""}`} key={p.label} onClick={() => setDays(Number(p.days))}>
                    {p.label}
                </button>
            ))}
        </div>

        </>
        
    )
}