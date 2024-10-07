const columns = [
  { name: "ID", uid: "id", sortable: true },

  {
    name: "Comprador",
    uid: "comprador",
    nested: [
      { name: "Nombre comprador", uid: "nombreComprador" },
      { name: "Correo comprador", uid: "correoComprador" },
      { name: "Teléfono comprador", uid: "telefonoComprador" },
    ],
  },
  { name: "Zona", uid: "zona", sortable: true },
  { name: "Tipo", uid: "tipo", sortable: true },
  { name: "Asientos", uid: "asientos" },
  { name: "Tipo de compra ", uid: "tipoCompra" },
  { name: "Sitio de venta", uid: "sitioVenta" },
  {
    name: "Forma de pago",
    uid: "pago",

    nested: [
      { name: "Tipo pago", uid: "tipoPago" },
      { name: "Método pago", uid: "metodoPago" },
    ],
  },

  { name: "Plazos del pago", uid: "plazo", sortable: false },
  { name: "Eliminar", uid: "actions" },
];

const columnsGeneral = [
  { name: "ID", uid: "idCompra", sortable: true },
  {
    name: "Comprador",
    uid: "comprador",

    nested: [
      { name: "Nombre comprador", uid: "nombreCliente" },
      { name: "Correo comprador", uid: "correoCliente" },
      { name: "Teléfono comprador", uid: "telefonoCliente" },
    ],
  },

  { name: "Cantidad boletos", uid: "cantidadBoletos", sortable: true },
  { name: "Zona", uid: "zona", sortable: true },

  { name: "Sitio de venta", uid: "sitioVenta" },
  {
    name: "Forma de pago",
    uid: "pago",
    nested: [
      { name: "Tipo pago", uid: "tipoPago" },
      { name: "Método pago", uid: "metodoPago" },
    ],
  },

  { name: "Plazos del pago", uid: "plazo", sortable: false },
  { name: "Eliminar", uid: "actions" },
];

const statusOptions = [
  { name: "Abonado", uid: "A" },
  { name: "No abonado", uid: "N" },
];

export { columns, columnsGeneral, statusOptions };
