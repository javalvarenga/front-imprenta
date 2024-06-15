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
import { createOrderService } from '../../queries/queries';

const studentFormSchema = z.object({
  nombreCliente: z
    .string()
    .min(1, { message: 'Nombre del cliente es requerido' }),
  correo: z.string().email({ message: 'Ingrese un correo válido' }),
  telefono: z.string().min(8, { message: 'Teléfono es requerido' }),
  direccion: z.string().min(1, { message: 'Dirección es requerida' }),
  nit: z.string().min(1, { message: 'NIT es requerido' }),
  fechaOrden: z.date({ required_error: 'Fecha de la orden es requerida' }),
  fechaRecepcion: z.date({ required_error: 'Fecha de recepción es requerida' }),
  fechaEstimada: z.date({ required_error: 'Fecha estimada es requerida' }),
  anticipo: z.string().min(1, { message: 'Anticipo es requerido' }),
  productoId: z.number().min(1, { message: 'ID del producto es requerido' }),
  cantidad: z.string().min(1, { message: 'Cantidad es requerida' }),
  descripcion: z.string().min(1, { message: 'Descripción es requerida' })
});

const productos = [
  { id: undefined, nombre: 'Ninguno' },
  { id: 2, nombre: 'Producto' },
  { id: 3, nombre: 'Tarjetas de Presentación' },
  { id: 4, nombre: 'Folletos' },
  { id: 5, nombre: 'Carteles' },
  { id: 6, nombre: 'Volantes' },
  { id: 7, nombre: 'Catálogos' },
  { id: 8, nombre: 'Revistas' },
  { id: 9, nombre: 'Etiquetas Adhesivas' },
  { id: 10, nombre: 'Banners y Lonas Publicitarias' },
  { id: 11, nombre: 'Libros y Cuadernos Personalizados' },
  { id: 12, nombre: 'Calendarios Personalizados' }
];

type StudentFormSchemaType = z.infer<typeof studentFormSchema>;

const CreateOrderForm = ({ modalClose }: { modalClose: () => void }) => {
  const form = useForm<StudentFormSchemaType>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {}
  });

  const onSubmit = (values: StudentFormSchemaType) => {
    console.log('values', values);

    const payload = {
      ...values,
      fechaOrden: format(values?.fechaOrden, 'yyyy/MM/dd hh:mm'),
      fechaRecepcion: format(values?.fechaRecepcion, 'yyyy/MM/dd'),
      fechaEstimada: format(values?.fechaEstimada, 'yyyy/MM/dd')
    };
    if (payload) {
      const result = createOrderService(payload);
      console.log('create result', result);
    }
  };

  const formValues = form.watch();

  console.log('formValues', formValues);

  return (
    <div className="px-2">
      <Heading
        title={'Nuevo Pedido'}
        description={'Ingresa toda la información.'}
        className="space-y-2 py-4 text-center"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="nombreCliente"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Nombre del cliente"
                      {...field}
                      className="px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Correo"
                      {...field}
                      className="px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            />
            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Dirección"
                      {...field}
                      className="px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nit"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="NIT"
                      {...field}
                      className="px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fechaOrden"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker
                      placeholderText="Fecha de la orden"
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
            <FormField
              control={form.control}
              name="fechaRecepcion"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker
                      placeholderText="Fecha de Recepción"
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className="custom-datepicker w-full px-4 py-3"
                      dateFormat="yyyy/MM/dd"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fechaEstimada"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker
                      placeholderText="Fecha Estimada"
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className="custom-datepicker w-full px-4 py-3"
                      dateFormat="yyyy/MM/dd"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="anticipo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Anticipo"
                      {...field}
                      className="px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productoId"
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
                      {productos.map((producto) => (
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
            <FormField
              control={form.control}
              name="cantidad"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Cantidad"
                      {...field}
                      className="px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Descripción"
                      {...field}
                      className="px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              Crear Orden
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateOrderForm;
