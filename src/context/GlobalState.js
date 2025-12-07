import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  transactions: [],
  error: null,
  loading: true
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // GET TRANSACTIONS
  async function getTransactions() {
    try {
      const res = await axios.get(API_URL);

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: Array.isArray(res.data?.data) ? res.data.data : []
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Server Error'
      });
    }
  }

  // DELETE TRANSACTION
  async function deleteTransaction(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Server Error'
      });
    }
  }

  // ADD TRANSACTION
  async function addTransaction(transaction) {
    try {
      const res = await axios.post(API_URL, transaction, {
        headers: { 'Content-Type': 'application/json' }
      });

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data?.data || {}
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Server Error'
      });
    }
  }

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      error: state.error,
      loading: state.loading,
      getTransactions,
      deleteTransaction,
      addTransaction
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
