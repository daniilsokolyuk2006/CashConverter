import { useEffect, useState } from "react";
import { LineChart,Line, XAxis,YAxis,Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";
import { fetchHistoricalRates } from "../services/HistoricalRates";

export default function CurrnecyCharts ({base, target, days, children}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    // function CalcDailyChange (data) {
    //     return data.map((item, index) => {
    //         if (index === 0) return {date: item.date, percent:0};

    //         const prevRate = data[index-1].rate;
    //         const currRate = data[index].rate;
    //         const percent = ((currRate-prevRate)/prevRate) * 100;
    //         return {date:item.date, percent: percent}
    //     })
    // }
    
    useEffect(() => {
        
        

        async function loadHistory () {
            try{

                const end = new Date();
                const start = new Date();

                start.setDate(end.getDate() - days);

                const startDate = start.toISOString().split("T")[0];
                const endDate = end.toISOString().split("T")[0];

                const rates = await fetchHistoricalRates (
                    base,
                    target,
                    startDate,
                    endDate
                );
                
                console.log(rates);

                const formattedData = Object.entries(rates).map(
                    ([date, rateObj]) => ({
                        date,
                        rate: rateObj[target]
                    })
                );

                console.log(formattedData);
                
                
                // const dailyPercentData = CalcDailyChange(formattedData);
                // const baseRate = formattedData[0].rate;
                // const percentData = formattedData.map(item => ({
                // date: item.date,
                // percent: ((item.rate - baseRate) / baseRate) * 100
                // }));   

                setData(formattedData);
            } catch (err) {
                setError(err.message);
            }finally {
                setLoading(false);
            }
        }

        loadHistory();
    },[base, target, days]);

    if(loading) return <p>Charts loading...</p>;
    if(error) return <p style={{color: "red"}}>{error}</p>;
    if(!data.length || data.length === 0) return <p>No data</p>;

    return (
        <div className="charts-wrapper" >
            <h1>Currency charts:</h1>
            <p>{`This shart shows ${base} / ${target} or just "Currency strange"`}</p>
            <div className="charts-inner">
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} >
                    <CartesianGrid strokeDasharray="3 3" stroke="grey" />
                    <XAxis dataKey={"date"}/>
                    <YAxis 
                    domain={['dataMin -0.0001', 'dataMax +0.0001']}
                    tickFormatter={(v) => v.toFixed(4)}/>
                    <Tooltip content={<CustomTooltip/>} />
                    <Line 
                        dataKey="rate"
                        stroke="black"
                        strokeWidth={2}
                        dot={false}
                        />

                </LineChart>
            </ResponsiveContainer>
            
            </div>
            <div className="chart-btn-wrapper">
                {children}
            </div>
            
        </div>
    )
}