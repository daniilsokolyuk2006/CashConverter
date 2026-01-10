const API_KEY = "493991c285a48a6a04d2e1af";

export async function fetchRates (baseCurrency="RUB") {
        const response = await fetch(
            `/api/${API_KEY}/latest/${baseCurrency}`
        );

        if(!response.ok) {
            throw new Error("Server request error. Try again later..")
        }

        const data = await response.json();

        if(data.result !== "success") {
            throw new Error(`Error: ${data["error-type"]}`);
        }
        // console.log(data.time_last_update_utc);
        return {
            rates : data.conversion_rates,
            date : data.time_last_update_utc
        }
}