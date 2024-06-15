import { addExpense, getExpenses, getExpensesByProvider } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

export const useGetExpenses = (fechaInicial, fechaFinal) => {
  return useQuery({
    queryKey: ['expenses', fechaInicial, fechaFinal],
    queryFn: async () => getExpenses(fechaInicial, fechaFinal),
    enabled: !!fechaInicial && !!fechaFinal // Solo ejecuta si ambas fechas están definidas
  });
};

export const useGetExpensesByProvider = () => {
  return useQuery({
    queryKey: ['expensesByProvider'],
    queryFn: async () => getExpensesByProvider()
  });
};

export const addExpenseService = async (payload) => {
  const response = await addExpense(payload);

  Swal.fire({
    position: 'center',
    title: '¡Muy Bien!',
    text: 'Pedido Agregado Correctamente.',
    icon: 'success',
    timer: 2000,
    width: 600,
    padding: '3em',
    color: '#716add',
    background: '#fff url(/images/trees.png)',
    backdrop: `
    rgba(0,0,123,0.4)
    url("/images/nyan-cat.gif")
    left top
    no-repeat
  `
  });

  return response;
};
