export enum Precios {
  PRECIO_T_GRADAS = 6.0,
  PRECIO_T_BUTACAS = 8.0,
  PRECIO_T_SILLAS = 10.0,
  PRECIO_C_SILLAS = 15.0,
  PRECIO_GENERAL = 3.0,
}

export const obtenerPrecioPorTipo = (tipo: string): number => {
  switch (tipo) {
    case "GRADAS":
      return Precios.PRECIO_T_GRADAS;
    case "BUTACAS":
      return Precios.PRECIO_T_BUTACAS;
    case "SILLAS":
      return Precios.PRECIO_T_SILLAS;
    case "C_SILLAS":
      return Precios.PRECIO_C_SILLAS;
    default:
      return Precios.PRECIO_GENERAL;
  }
};