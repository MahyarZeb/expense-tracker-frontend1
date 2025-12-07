import React from 'react';
import { render, screen } from '@testing-library/react';
import { GlobalProvider } from '../context/GlobalState';
import AddTransaction from '../components/AddTransaction';

test('renders add transaction form', () => {
  render(<GlobalProvider><AddTransaction /></GlobalProvider>);
  
  const textInput = screen.getByPlaceholderText(/Enter text/i);
  const amountInput = screen.getByPlaceholderText(/Enter amount/i);
  const button = screen.getByText(/Add transaction/i);

  expect(textInput).toBeInTheDocument();
  expect(amountInput).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  fireEvent.change(textInput, { target: { value: 'Pizza' } });
  fireEvent.change(amountInput, { target: { value: '200' } });
  fireEvent.click(button);
});
