import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import OrdersTableActions from './orders-table-action';
import { useState } from 'react';

type TOrdersTableProps = {
  orders: any;
};

export default function OrdersTable({ orders }: TOrdersTableProps) {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const handleSelectedRowsChange = (rows: any) => {
    setSelectedRows(rows);
  };

  return (
    <>
      <OrdersTableActions selectedRows={selectedRows} />
      {orders && (
        <DataTable
          columns={columns}
          data={orders}
          onSelectedRowsChange={handleSelectedRowsChange}
        />
      )}
    </>
  );
}
