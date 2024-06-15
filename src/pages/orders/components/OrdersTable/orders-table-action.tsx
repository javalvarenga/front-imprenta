import PopupModal from '@/components/shared/popup-modal';
import TableSearchInput from '@/components/shared/table-search-input';
import CreateOrderForm from '../CreateOrderForm/CreateOrderForm';
import OrderDetails from '../orderDetails/OrderDetails';

export default function OrdersTableActions({ selectedRows }) {
  console.log('selectedRows', selectedRows);

  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Buscar" />
      </div>
      {/*       <span className="px-5">pedidos seleccionados {selectedRows.length}</span>*/}
      <div className="flex gap-3">
        <PopupModal
          title={'Nuevo Pedido'}
          renderModal={(onClose) => <CreateOrderForm modalClose={onClose} />}
        />
      </div>
      <div className="flex gap-3">
        <PopupModal
          disabled={selectedRows.length != 1}
          icon="ReceiptText"
          renderModal={(onClose) => (
            <OrderDetails
              modalClose={onClose}
              orderId={selectedRows[0]?.ordenId}
            />
          )}
        />
      </div>
    </div>
  );
}
