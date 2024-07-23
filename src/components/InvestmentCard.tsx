import React from 'react';

interface InvestmentCard {
  name: string;
  typeofAsset: string;
  value: number;
}

const InvestmentCard: React.FC<InvestmentCard> = ({ name, typeofAsset, value }): React.JSX.Element => {
  return (
    <div>
      <h4>Investment Card</h4>
      <p>Name: {name}</p>
      <p>Type of Asset: {typeofAsset}</p>
      <p>Value: {value}</p>
      <div>
        <button>Buy/Sell</button>
        <button>T. History</button>
      </div>
    </div>
  );
}

export default InvestmentCard;

