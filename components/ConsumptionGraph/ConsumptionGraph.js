import React from 'react';
import { Bar } from 'react-chartjs-2';

const ConsumptionGraph = ({ data }) => {
    const formattedData = {
        labels: data.map(item => item.hour),
        datasets: [
            {
                label: 'Consumption (kWh)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.map(item => item.value),
            },
        ],
    };

    return (
        <div className="ConsumptionGraph">
            <h2>Consumption</h2>
            <Bar
                data={formattedData}
                width={100}
                height={50}
                options={{ maintainAspectRatio: false }}
            />
        </div>
    );
};

export default ConsumptionGraph;
