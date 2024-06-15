import PageHead from '@/components/shared/page-head';
import { useGetOrders } from './queries/queries';
import OrdersTable from './components/OrdersTable';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';

export default function OrdersPage() {
  const { data, isLoading } = useGetOrders();

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton
          columnCount={10}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </div>
    );
  }

  return (
    <div className="p-5">
      <PageHead title="Pedidos" />
      <OrdersTable orders={data} />
    </div>
  );
}
