import React from "react";
import { render, screen } from "@testing-library/react";
import { AddTransaction } from "../components/AddTransaction";
import { GlobalProvider } from "../context/GlobalState";

test("renders add transaction form", () => {
  render(
    <GlobalProvider>
      <AddTransaction />
    </GlobalProvider>
  );

  const textInput = screen.getByPlaceholderText(/Enter text/i);
  const amountInput = screen.getByPlaceholderText(/Enter amount/i);
  const button = screen.getByText(/Add transaction/i);

  expect(textInput).toBeInTheDocument();
  expect(amountInput).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});