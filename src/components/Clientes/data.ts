const columns = [
  { name: "ID", uid: "idComprador", sortable: true },
  { name: "Correo Comprador", uid: "correoComprador", sortable: true },
  { name: "Cliente", uid: "nombreComprador", sortable: true },
  { name: "Telefono comprador", uid: "telefonoComprador", sortable: true },
  { name: "Acción", uid: "actions" },
];

const statusOptions = [
  { name: "Abonado", uid: "A" },
  { name: "No abonado", uid: "N" },
];

export { columns, statusOptions };
