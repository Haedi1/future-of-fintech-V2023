import React, { useState, useEffect } from "react";
import axios from "axios";

export const App = () => {
    const [consumptionData, setConsumptionData] = useState([]);
    const [providerData, setProviderData] = useState([]);
    const [cheapestProvider, setCheapestProvider] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const [consumptionResponse, providerResponse] = await Promise.all([
                axios.get("https://future-of-fintech-v2023.vercel.app/api/consumption"),
                axios.get("https://future-of-fintech-v2023.vercel.app/api/providers"),
            ]);
            setConsumptionData(consumptionResponse.data);
            setProviderData(providerResponse.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (consumptionData.length && providerData.length) {
            let cheapestCost = Infinity;
            let cheapestProviderData;
            providerData.forEach((provider) => {
                let providerCost = 0;
                consumptionData.forEach((consumption) => {
                    providerCost += provider.price * consumption.quantity;
                });
                if (providerCost < cheapestCost) {
                    cheapestCost = providerCost;
                    cheapestProviderData = provider;
                }
            });
            setCheapestProvider(cheapestProviderData);
        }
    }, [consumptionData, providerData]);

    return (
        <div>
            {cheapestProvider ? (
                <div>
                    <h2>Cheapest Provider: {cheapestProvider.name}</h2>
                    <p>Cost: {cheapestProvider.price}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

// export default App;
