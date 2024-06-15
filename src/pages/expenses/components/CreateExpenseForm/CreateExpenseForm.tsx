import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { addExpenseService } from '../../queries/index';

const studentFormSchema = z.object({
  monto: z.string().min(1, { message: 'el monto es requerido' }),
  fechaGasto: z.date({ required_error: 'Fecha de la orden es requerida' }),
  providerId: z.number().min(1, { message: 'Proveedor es requerido' }),
  tipoGasto: z.number().min(1, { message: 'Tipo de gasto es requerido' })
});

const proveedores = [
  { id: undefined, nombre: 'Ninguno' },
  { id: 1, nombre: 'Proveedor 1' },
  { id: 2, nombre: 'Proveedor 2' },
  { id: 3, nombre: 'Proveedor 3' }
];

const tipoGasto = [
  { id: undefined, nombre: 'Ninguno' },
  { id: 1, nombre: 'Gastos por mantenimiento de equipo' },
  { id: 2, nombre: 'Salario de empleados' },
  { id: 3, nombre: 'Pagos extra empleado' },
  { id: 4, nombre: 'Compra de material' }
];

type StudentFormSchemaType = z.infer<typeof studentFormSchema>;

const CreateExpenseForm = ({
  modalClose,
  orderId
}: {
  modalClose: () => void;
  orderId: number;
}) => {
  const form = useForm<StudentFormSchemaType>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {}
  });

  const onSubmit = (values: StudentFormSchemaType) => {
    const payload = {
      ...values,
      fechaGasto: format(values?.fechaGasto, 'yyyy/MM/dd HH:mm'),
      orderId: orderId
    };
    if (payload) {
      const result = addExpenseService(payload);
      console.log('create result', result);
    }
  };

  const formValues = form.watch();

  return (
    <div className="px-2">
      <Heading
        title={'Nuevo Gasto'}
        description={`Para la orden #${orderId ?? ''}`}
        className="space-y-2 py-4 text-center"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {/*    
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Teléfono"
                      {...field}
                      className="px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <div>
              <label>Monto</label>
              <FormField
                control={form.control}
                name="monto"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Monto"
                        {...field}
                        className="px-4 py-6 shadow-inner drop-shadow-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <label>Fecha del Gasto</label>
              <FormField
                control={form.control}
                name="fechaGasto"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DatePicker
                        placeholderText="Fecha del Gasto"
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        className="custom-datepicker w-full px-4 py-3"
                        dateFormat="yyyy/MM/dd HH:mm" // HH:mm para hora y minutos en formato 24 horas
                        showTimeSelect
                        timeIntervals={15} // Intervalo de minutos para la selección
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
              <label>Proveedor</label>
              <FormField
                control={form.control}
                name="providerId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full px-4 py-3"
                        onChange={(e) =>
                          field.onChange(
                            Number(e.target.value)
                              ? Number(e.target.value)
                              : undefined
                          )
                        }
                      >
                        {proveedores.map((producto) => (
                          <option key={producto.id} value={producto.id}>
                            {producto.nombre}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <label>Tipo de Gasto</label>
              <FormField
                control={form.control}
                name="tipoGasto"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full px-4 py-3"
                        onChange={(e) =>
                          field.onChange(
                            Number(e.target.value)
                              ? Number(e.target.value)
                              : undefined
                          )
                        }
                      >
                        {tipoGasto.map((producto) => (
                          <option key={producto.id} value={producto.id}>
                            {producto.nombre}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full"
              size="lg"
              onClick={modalClose}
            >
              Cancelar
            </Button>
            <Button type="submit" className="rounded-full" size="lg">
              Agregar Gasto
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateExpenseForm;
