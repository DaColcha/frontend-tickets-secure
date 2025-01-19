import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
  Spinner,
} from "@nextui-org/react";

import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { columnsGeneral, statusOptions } from "./data";
import ButtonEliminarCompraGeneral from "./Buttons/ButtonEliminarGeneral";
import { getVendidosGeneral } from "@/lib/actions/total-vendidos.actions";
import { useAuth } from "@/context/AuthContext";

const INITIAL_VISIBLE_COLUMNS = [
  "idCompra",
  "zona",
  "tipo",
  "cantidadBoletos",
  "comprador",
  "actions",
];

export default function TablaGeneral() {
  const [isLoad, setIsLoad] = useState(true);
  const [vendidosGeneral, setVendidosGeneral] = useState<any[]>([]);
  const { user } = useAuth();

  const fetchVendidosGeneral = async () => {
    const response = await getVendidosGeneral(user?.token || '');
    setVendidosGeneral(response);
    setIsLoad(false);
  };

  useEffect(() => {
    fetchVendidosGeneral();
  }, []);

  type Vendido = (typeof vendidosGeneral)[0];
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "comprador",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columnsGeneral;

    return columnsGeneral.filter((columnsGeneral) =>
      Array.from(visibleColumns).includes(columnsGeneral.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...vendidosGeneral];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((vendido) =>
        vendido.comprador.nombreCliente
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((vendido) =>
        Array.from(statusFilter).includes(vendido.status)
      );
    }

    return filteredUsers;
  }, [vendidosGeneral, hasSearchFilter, statusFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Vendido, b: Vendido) => {
      const first = a[sortDescriptor.column as keyof Vendido] as number;
      const second = b[sortDescriptor.column as keyof Vendido] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (vendido: Vendido, columnKey: React.Key) => {
      const cellValue = vendido[columnKey as keyof Vendido];

      switch (columnKey) {
        case "zona":
          return (
            <>
              <p>{vendido.zona}</p>
            </>
          );
        case "tipo":
          return (
            <>
              <p>{vendido.tipo}</p>
            </>
          );
        case "asientos":
          return (
            <>
              <p>{vendido.asientos.join(" - ")}</p>
            </>
          );
        case "comprador":
          return (
            <>
              <p className="font-bold">{vendido.comprador.nombreComprador}</p>
              <p className="font-light">{vendido.comprador.correoComprador}</p>
              <p className="font-light">
                {vendido.comprador.telefonoComprador}
              </p>
            </>
          );
        case "tipoCompra":
          return (
            <>
              <p>{vendido.tipoCompra}</p>
            </>
          );
        case "sitioVenta":
          return (
            <>
              <p>{vendido.sitioVenta}</p>
            </>
          );

        case "pago":
          return (
            <>
              <p>{vendido.pago.tipoPago}</p>
              <p>{vendido.pago.metodoPago}</p>
            </>
          );
        case "plazo":
          return (
            <>
              <p>{vendido.plazo}</p>
            </>
          );
        case "actions":
          return (
            <div className="relative flex items-center">
              <ButtonEliminarCompraGeneral
                params={{
                  idCompra: vendido.idCompra,
                }}
              />
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Buscar por nombre"
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  className="bg-[#163056] text-white"
                  endContent={<ChevronDownIcon className="text-small" />}
                >
                  Columnas a mostrar
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columnsGeneral.map((columnsGeneral) => (
                  <DropdownItem key={columnsGeneral.uid}>
                    {columnsGeneral.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <label className="flex items-center text-default-400 text-small">
            Compras por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">5</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, visibleColumns, onRowsPerPageChange]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-[#163056] text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [hasSearchFilter, page, pages]);

  const classNames = React.useMemo(
    () => ({
      th: [
        "bg-[#163056]",
        "text-white",
        "font-semibold",
        "uppercase",
        "tracking-wider",
      ],

      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",

        "group-data-[middle=true]:before:rounded-none",

        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
        "border-l",
        "border-r",
        "border-t",
        "border-b",
      ],
    }),
    []
  );

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={classNames}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={isLoad ? <Spinner /> : "No hay resultados"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.idCompra}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
