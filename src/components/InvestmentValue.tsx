import React from 'react';
import styles from './InvestmentValue.module.css';

interface InvestmentValueProps {
  investedValue: number;
}

const InvestmentValue: React.FC<InvestmentValueProps> = ({ investedValue }): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <h4>INVESTED VALUE</h4>
      <p>{investedValue} $</p>
    </div>
  );
};

export default InvestmentValue;
