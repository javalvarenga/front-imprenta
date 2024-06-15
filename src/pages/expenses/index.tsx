import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useRouter } from '@/routes/hooks';
import DataTable from '@/components/shared/data-table';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { useGetExpenses, useGetExpensesByProvider } from './queries';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import {
  addDays,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds
} from 'date-fns';
import { PlusIcon } from 'lucide-react';
import { formatNumberWithCommas } from '@/lib/utils';

const expensesFormSchema = z.object({
  fechaInicial: z.date({ required_error: 'Fecha de la orden es requerida' }),
  fechaFinal: z.date({ required_error: 'Fecha de recepción es requerida' })
});

type expensesFormSchemaType = z.infer<typeof expensesFormSchema>;

export const columns: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'ordenId',
    header: 'ID'
  },
  {
    accessorKey: 'descripcionDetalle',
    header: 'Descripción'
  },
  {
    accessorKey: 'descripcionTipoGasto',
    header: 'Tipo de Gasto'
  },
  {
    accessorKey: 'monto',
    header: 'Monto',
    cell: (value: any) => {
      const valor = value.getValue();
      return formatNumberWithCommas(Number(valor));
    }
  },
  {
    accessorKey: 'anticipo',
    header: 'ANTICIPO',
    cell: (value: any) => {
      const valor = value.getValue();
      return formatNumberWithCommas(Number(valor));
    }
  },
  {
    accessorKey: 'saldo',
    header: 'SALDO',
    cell: (value: any) => {
      const valor = value.getValue();
      return formatNumberWithCommas(Number(valor));
    }
  }
];

export const columnsByProvider: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'nombreProveedor',
    header: 'Proveedor'
  },
  {
    accessorKey: 'numeroDeGastos',
    header: 'Total de Gastos'
  },
  {
    accessorKey: 'telefono',
    header: 'Teléfono'
  },
  {
    accessorKey: 'totalGastos',
    header: 'Gastado (Q)',
    cell: (value: any) => {
      const valor = value.getValue();
      return formatNumberWithCommas(Number(valor));
    }
  }
];

export default function ExpensesPage() {
  const today = new Date();
  const defaultEndDate = setMilliseconds(
    setSeconds(setMinutes(setHours(today, 23), 59), 59),
    999
  );
  const initialDate = setMilliseconds(
    setSeconds(setMinutes(setHours(addDays(today, -3), 0), 0), 0),
    0
  );

  const [selectedRows, setSelectedRows] = useState<any>([]);
  const handleSelectedRowsChange = (rows: any) => {
    setSelectedRows(rows);
  };

  const form = useForm<expensesFormSchemaType>({
    resolver: zodResolver(expensesFormSchema),
    defaultValues: {
      fechaInicial: initialDate,
      fechaFinal: defaultEndDate
    }
  });

  const formValues = form.watch();

  const { data, isLoading } = useGetExpenses(
    formValues?.fechaInicial,
    formValues?.fechaFinal
  );

  const { data: expensesByProvider, isLoading: isLoadingByProvider } =
    useGetExpensesByProvider();

  const router = useRouter();

  const onSubmit = (values: expensesFormSchemaType) => {
    console.log('values', values);
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <Heading title={'Reportes de Gastos'} />
      </div>
      <div className="grid grid-cols-12 gap-1 py-6 lg:grid-cols-1">
        {/* contact information  */}
        <Card className=" col-span-1 bg-secondary shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] drop-shadow-sm lg:col-span-3">
          <CardHeader className="text-xl font-bold">
            Órdenes y Gastos
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="grid grid-cols-6 gap-x-1 gap-y-1"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div>
                  <label>Fecha Inicial</label>
                  <FormField
                    control={form.control}
                    name="fechaInicial"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <DatePicker
                            placeholderText="Fecha inicial"
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            className="custom-datepicker mb-6 mt-3 w-full px-4 py-3"
                            dateFormat="yyyy/MM/dd HH:mm" // HH:mm para hora y minutos en formato 24 horas
                            showTimeSelect
                            timeIntervals={30} // Intervalo de minutos para la selección
                            timeCaption="Hora" // Texto para la sección de la hora
                            dateFormatCalendar="MMMM yyyy"
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <label>Fecha Final</label>
                  <FormField
                    control={form.control}
                    name="fechaFinal"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <DatePicker
                            placeholderText="Fecha final"
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            className="custom-datepicker mb-6 mt-3  px-4 py-3"
                            dateFormat="yyyy/MM/dd HH:mm" // HH:mm para hora y minutos en formato 24 horas
                            showTimeSelect
                            timeIntervals={30} // Intervalo de minutos para la selección
                            timeCaption="Hora" // Texto para la sección de la hora
                            dateFormatCalendar="MMMM yyyy"
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
            <div>
              {!isLoading ? (
                <DataTable
                  columns={columns}
                  data={data}
                  onSelectedRowsChange={handleSelectedRowsChange}
                  defaultpageSize={20}
                />
              ) : (
                <div className="p-5">
                  <DataTableSkeleton
                    columnCount={5}
                    filterableColumnCount={2}
                    searchableColumnCount={1}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className=" col-span-1 mt-6 bg-secondary shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] drop-shadow-sm lg:col-span-3">
          <CardHeader className="text-xl font-bold">
            Gastos Por Proveedor
          </CardHeader>
          <CardContent>
            <div>
              {!isLoadingByProvider ? (
                <DataTable
                  columns={columnsByProvider}
                  data={expensesByProvider ?? []}
                  onSelectedRowsChange={handleSelectedRowsChange}
                />
              ) : (
                <div className="p-5">
                  <DataTableSkeleton
                    columnCount={5}
                    filterableColumnCount={2}
                    searchableColumnCount={1}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
