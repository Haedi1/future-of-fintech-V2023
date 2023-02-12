import React, { useState, useEffect } from 'react';
import ProviderCard from '../../components/ProviderCard/ProviderCard';
import ConsumptionGraph from '../../components/ConsumptionGraph/ConsumptionGraph';
import ComparisonTable from '../../components/ComparisonTable/ComparisonTable';
import axios from 'axios';

const Home = () => {
    const [consumptionData, setConsumptionData] = useState([]);
    const [providerData, setProviderData] = useState([]);
    const [cheapestProvider, setCheapestProvider] = useState(null);

    useEffect(() => {
        const fetchConsumptionData = async () => {
            const consumptionResponse = await axios.get(
                'https://future-of-fintech-v2023.vercel.app/api/consumption'
            );
            setConsumptionData(consumptionResponse.data);
        };

        const fetchProviderData = async () => {
            const providerResponse = await axios.get(
                'https://future-of-fintech-v2023.vercel.app/api/providers'
            );
            setProviderData(providerResponse.data);
        };

        fetchConsumptionData().then(r => console.log(r));
        fetchProviderData().then(r => console.log(r));
    }, []);

    useEffect(() => {
        if (consumptionData.length > 0 && providerData.length > 0) {
            let lowestCost = Number.MAX_SAFE_INTEGER;
            let cheapest;

            providerData.forEach((provider) => {
                provider.price_per_kWh = provider.price_per_kWh.map((price) => {
                    return price / 100;
                });
                let totalCost = 0;
                consumptionData.forEach((consumption) => {
                    totalCost +=
                        consumption.value * provider.price_per_kWh[consumption.hour];
                });

                if (totalCost < lowestCost) {
                    lowestCost = totalCost;
                    cheapest = provider;
                }
            });

            setCheapestProvider(cheapest);
        }
    }, [consumptionData, providerData]);

    return (
        <div className="Home">
            <h1>Cheapest Power Provider</h1>
            {cheapestProvider ? (
                <ProviderCard
                    name={cheapestProvider.name}
                    pricePerkWh={cheapestProvider.price_per_kWh}
                />
            ) : (
                <p>Loading...</p>
            )}
            <ConsumptionGraph data={consumptionData} />
            <ComparisonTable providers={providerData} />
        </div>
    );
};

export default Home;
