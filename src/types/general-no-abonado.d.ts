
type Comprador = {
  cedula: string;
  nombre: string;
  correo: string;
  telefono: string;
};

export type GeneralAbonado = {
  zona: string;
  cantidad: number;
  comprador: Comprador;
  tipoCompra: "A" | "N";
  vendedor: string | undefined; 
  idPago: string | number;    
};
