import React, {useEffect, useMemo, useState} from 'react';
import InvestmentValue from './components/InvestmentValue';
import InvestmentCard from './components/InvestmentCard';
import InvestmentChart from './components/InvestmentChart';
import styles from './App.module.css';

export interface DataInterface {
  items: [];
}

interface MapItem {
  name: string;
  assetType: string;
  pricePerUnit: number;
  amount: number;
}

const BUY = 'buy';

function App() {
  const [data, setData] = useState<DataInterface | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://interviews-live.deno.dev/assets');
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  const investedValue = useMemo(() => {
    let value = 0;
    if (data?.items) {
      data.items.forEach((item: any) => {
        if (item.type === BUY) {
          value += (item.pricePerUnit * item.amount);
        }
      });
    }
    return value;
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.investedContainer}>
        <div className={styles.investedItem}>
          <InvestmentValue investedValue={investedValue} />
        </div>
        <div className={styles.investedItem}>
          <InvestmentChart data={data} investedValue={investedValue} />
        </div>
      </div>
      <div className={styles.investmentCardContainer}>
        {data?.items.map((item: MapItem, index) => (
          <InvestmentCard
            key={index}
            name={item.name}
            typeofAsset={item.assetType}
            value={item.pricePerUnit * item.amount}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
