import React from 'react';
import LiqPayPayment from './components/LiqPayPayment';

export default function Home() {
  return (
    <div>
      <LiqPayPayment amount='500' currency='UAH' description='Test payment' />
    </div>
  );
}
