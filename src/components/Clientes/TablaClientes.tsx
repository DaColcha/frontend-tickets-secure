/* eslint-disable react-hooks/exhaustive-deps */
"use client";
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
  Pagination,
  Selection,
  SortDescriptor,
  Spinner,
} from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";
import { columns, statusOptions } from "./data";
import { getClientes } from "@/lib/actions/clientes.actions";
import { CheckIcon } from "@/icons/CheckIcon";
import { useAuth } from "@/context/AuthContext";

const INITIAL_VISIBLE_COLUMNS = ["nombreComprador", "actions"];

interface TablaClientesProps {
  onClienteSeleccionado: (cliente: any) => void;
}

export default function TablaClientes({
  onClienteSeleccionado,
}: TablaClientesProps) {
  
  const [clientes, setClientes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchClientes = async () => {
    setIsLoading(true);
    const response = await getClientes(user?.token || '');
    setIsLoading(false);
    setClientes(response);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleSelectCliente = (cliente: any) => {
    onClienteSeleccionado(cliente);
  };

  type Cliente = (typeof clientes)[0];
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter] = React.useState<Selection>("all");
  const [rowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "nombreComprador",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((columns) =>
      Array.from(visibleColumns).includes(columns.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...clientes];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((cliente) =>
        cliente.nombreComprador
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((cliente) =>
        Array.from(statusFilter).includes(cliente.status)
      );
    }

    return filteredUsers;
  }, [clientes, hasSearchFilter, statusFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Cliente, b: Cliente) => {
      const first = a[sortDescriptor.column as keyof Cliente] as number;
      const second = b[sortDescriptor.column as keyof Cliente] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (cliente: Cliente, columnKey: React.Key) => {
      const cellValue = cliente[columnKey as keyof Cliente];

      switch (columnKey) {
        case "nombreComprador":
          return (
            <>
              <p className="font-bold">{cliente.nombreComprador}</p>
              <p className="font-light">{cliente.correoComprador}</p>
              <p className="font-light">{cliente.telefonoComprador}</p>
            </>
          );

        case "actions":
          return (
            <div className="relative flex items-center">
              <Button
                onClick={() => handleSelectCliente(cliente)}
                endContent={<CheckIcon />}
                size="sm"
                className="w-fit bg-[#d4b47e] font-semibold text-white"
              >
                Seleccionar
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleSelectCliente]
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
        </div>
      </div>
    );
  }, [filterValue, onSearchChange]);

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
      {isLoading ? (
        <Spinner />
      ) : (
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
          <TableBody emptyContent={"No users found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.idComprador}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
