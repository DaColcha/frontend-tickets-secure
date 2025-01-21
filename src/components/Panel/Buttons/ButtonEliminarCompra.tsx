import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { toast } from "sonner";
import { DeleteIcon } from "../../icons/DeleteIcon";

interface ButtonEliminarCompraProps {
  params: {
    localidad: string;
    zona: string;
    tipo: string;
    asientosSeleccionados: number[];
  };
}

export default function ButtonEliminarCompra({
  params,
}: ButtonEliminarCompraProps) {
  const [isCleaning, setIsCleaning] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const limpiarAsientos = async (abonado: {
    zona: string;
    tipo: string;
    asientosSeleccionados: number[];
  }) => {
    setIsCleaning(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/eliminar/${params.localidad}`,
        {
          method: "PATCH",
          body: JSON.stringify(abonado),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el abonado");
      }
    } catch (error) {
      toast.error("Error al eliminar el abonado");
    } finally {
      toast.success("Se ha eliminado el abonado");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
      setIsCleaning(false);
     
    }
  };
  return (
    <div className="flex flex-col items-center justify-items-center">
      <Button
        onPress={onOpen}
        variant="bordered"
        color="danger"
        disabled={isCleaning}
      >
        {isCleaning ? <Spinner /> : <DeleteIcon />}
      </Button>

      <Modal
        backdrop="blur"
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                ¿Está seguro de eliminar el abonado de la localidad?
              </ModalHeader>
              <ModalBody className="text-pretty">
                <p>
                  Recuerde que al eliminar el abonado, se eliminará la
                  información de compra de los asientos indicados.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="w-full bg-red-500 text-white font-semibold"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  className="w-full bg-[#163056] text-white font-semibold"
                  onClick={() =>
                    limpiarAsientos({
                      zona: params.zona,
                      tipo: params.tipo,
                      asientosSeleccionados: params.asientosSeleccionados,
                    })
                  }
                  onPress={onClose}
                >
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
