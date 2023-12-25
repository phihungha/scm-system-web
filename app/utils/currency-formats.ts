'use client';

const CurrencyFormat = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export default CurrencyFormat;

export const currencySymbol = '₫';
