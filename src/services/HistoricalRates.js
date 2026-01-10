
export async function fetchHistoricalRates(base, target, start, end) {
    const url = `https://api.frankfurter.app/${start}..${end}?from=${base}&to=${target}`;
    
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error("Historical data request error!");
    }

    const data = await response.json();
    return data.rates;
}