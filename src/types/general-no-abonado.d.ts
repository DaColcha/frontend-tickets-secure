export interface GeneralAbonado {
  params: {
    zona: string;
    comprador: {
      correoComprador: string;
      nombreComprador: string;
      telefonoComprador: string;
    };
    cantidadBoletos: number;
    sitioVenta: string;
    pago: string;
    plazo: string;
  };
}
