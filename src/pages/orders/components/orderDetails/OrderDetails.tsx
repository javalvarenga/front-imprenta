import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useGetOrderDetails } from '../../queries/queries';
import PopupModal from '@/components/shared/popup-modal';
import CreateExpenseForm from '@/pages/expenses/components/CreateExpenseForm/CreateExpenseForm';

const Badge = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
};

const OrderDetails = ({
  modalClose,
  orderId
}: {
  modalClose: () => void;
  orderId: number;
}) => {
  const { data, isLoading } = useGetOrderDetails(orderId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const formatDate = (dateString) => {
    return dateString ? format(new Date(dateString), 'dd/MM/yyyy') : 'N/A';
  };

  const formattedOrderDate = formatDate(data.fechaOrden);
  const formattedReceptionDate = formatDate(data.fechaRecepcion);
  const formattedEstimatedDate = formatDate(data.fechaEstimada);
  const formattedRealDate = formatDate(data.fechaReal);

  const getStatusClass = (estado) => {
    switch (estado) {
      case 1: // Por ejemplo, estado '1' podría ser 'Pendiente'
        return 'bg-yellow-100 text-yellow-800';
      case 2: // Por ejemplo, estado '2' podría ser 'En proceso'
        return 'bg-blue-100 text-blue-800';
      case 3: // Por ejemplo, estado '3' podría ser 'Completado'
        return 'bg-green-100 text-green-800';
      case 4: // Por ejemplo, estado '4' podría ser 'Cancelado'
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="px-2">
      <Heading
        title={'Pedido'}
        description={'Detalles del pedido'}
        className="space-y-2 py-4 text-center"
      />
      <div className="flex ">
        <div className="flex w-full items-center justify-end">
          <div className="flex gap-3">
            <PopupModal
              title={'Agregar Gasto'}
              renderModal={(onClose) => (
                <CreateExpenseForm modalClose={onClose} orderId={orderId} />
              )}
            />
          </div>
        </div>
      </div>
      {!isLoading && (
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <strong>Orden ID:</strong> {data.ordenId ? data.ordenId[0] : ''}
          </div>
          <div>
            <strong>Cliente ID:</strong> {data.clienteId}
          </div>
          <div>
            <strong>Nombre del Cliente:</strong> {data.nombreCliente}
          </div>
          <div>
            <strong>Teléfono:</strong> {data.telefono}
          </div>
          <div>
            <strong>Fecha de Orden:</strong> {formattedOrderDate}
          </div>
          <div>
            <strong>Fecha de Recepción:</strong> {formattedReceptionDate}
          </div>
          <div>
            <strong>Fecha Estimada:</strong> {formattedEstimatedDate}
          </div>
          <div>
            <strong>Fecha Real:</strong> {formattedRealDate}
          </div>
          <div>
            <strong>Total:</strong> {data.Total}
          </div>
          <div>
            <strong>Estado: </strong>
            <Badge className={getStatusClass(data.estado)}>
              {data.estado === 1 && 'Diseñando'}
              {data.estado === 2 && 'En proceso'}
              {data.estado === 3 && 'Completado'}
              {data.estado === 4 && 'Cancelado'}
            </Badge>
          </div>
          <div>
            <strong>Anticipo:</strong> {data.anticipo}
          </div>
          <div>
            <strong>Detalle ID:</strong> {data.detalleId}
          </div>
          <div>
            <strong>Producto ID:</strong> {data.productoId}
          </div>
          <div>
            <strong>Cantidad:</strong> {data.cantidad}
          </div>
          <div>
            <strong>Precio Unitario:</strong> {data.precioUnitario}
          </div>
          <div className="col-span-2">
            <strong>Descripción:</strong> {data.descripcion}
          </div>
          <div className="col-span-2">
            <strong>Saldo:</strong> {data.saldo}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <Button onClick={modalClose}>Cerrar</Button>
      </div>
    </div>
  );
};

export default OrderDetails;
