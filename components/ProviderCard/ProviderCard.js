import React from 'react';

const ProviderCard = ({ name, pricePerkWh }) => {
    return (
        <div className="ProviderCard">
            <h2>{name}</h2>
            <p>Price per kWh: ${pricePerkWh}</p>
        </div>
    );
};

export default ProviderCard;
