import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

const defaultConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

export async function getOrders() {
  try {
    const res = await axios.post(`http://localhost:3000/orders/list`);

    return camelcaseKeys(res.data);
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function getOrderDetails(orderId) {
  try {
    const response = await fetch('http://localhost:3000/orders/details', {
      body: JSON.stringify({ orderId: orderId }),
      ...defaultConfig
    });

    const data = await response.json();
    return camelcaseKeys(data);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createOrder(payload) {
  try {
    const response = await fetch('http://localhost:3000/orders/create', {
      body: JSON.stringify(payload),
      ...defaultConfig
    });

    const data = await response.json();
    return camelcaseKeys(data);
  } catch (error) {
    console.log(error);
    return error;
  }
}

/* EXPENSES */

export async function getExpenses(fechaInicial, fechaFinal) {
  if (fechaInicial && fechaFinal) {
    try {
      const response = await fetch('http://localhost:3000/expenses/list', {
        body: JSON.stringify({
          fechaInicial: fechaInicial,
          fechaFinal: fechaFinal
        }),
        ...defaultConfig
      });

      const data = await response.json();
      return camelcaseKeys(data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export async function getExpensesByProvider() {
  try {
    const res = await axios.post(`http://localhost:3000/expenses/byProvider`);

    return camelcaseKeys(res.data);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function addExpense(payload) {
  try {
    console.log('payload', payload);
    const response = await fetch('http://localhost:3000/expenses/add', {
      body: JSON.stringify(payload),
      ...defaultConfig
    });

    const data = await response.json();
    return camelcaseKeys(data);
  } catch (error) {
    console.log(error);
    return error;
  }
}
