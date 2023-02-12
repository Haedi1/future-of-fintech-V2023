const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/power-providers', async (req, res) => {
    try {
        const providersResponse = await axios.get('https://future-of-fintech-v2023.vercel.app/api/providers');
        const providersData = providersResponse.data;

        const consumptionResponse = await axios.get('https://future-of-fintech-v2023.vercel.app/api/consumption');
        const consumptionData = consumptionResponse.data;

        const results = [];
        for (const provider of providersData) {
            let totalCost = 0;
            for (const consumption of consumptionData) {
                totalCost += provider.price * consumption.quantity;
            }
            results.push({
                provider: provider.provider,
                totalCost: totalCost
            });
        }
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the data.' });
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000.');
});
