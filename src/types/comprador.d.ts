export interface Asiento {
  comprador: {
    correoComprador: string;
    nombreComprador: string;
    telefonoComprador: string;
  };
  asientosSeleccionados: number[];
  tipoCompra: string;
  localidad: string;
  zona: string;
  tipo: string;
  sitioVenta: string;
  pago: string;
  plazo: string | null;
}
