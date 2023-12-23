'use client';

const VndCurrencyFormat = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export default VndCurrencyFormat;
