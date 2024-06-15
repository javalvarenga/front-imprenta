import { getOrders, createOrder, getOrderDetails } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';

export const useGetOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => getOrders()
  });
};

export const useGetOrderDetails = (orderId) => {
  return useQuery({
    queryKey: ['orderDetails'],
    queryFn: async () => getOrderDetails(orderId)
  });
};

export const createOrderService = async (payload) => {
  const response = await createOrder(payload);

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
