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
import { DeleteIcon } from "./icons/DeleteIcon";
import axios from "axios";

interface ButtonEliminarAbonadoProps {
  params: {
    localidad: string;
    zona: string;
    tipo: string;
    asientosSeleccionados: number[];
  };
}

export default function ButtonEliminarNoAbonado({
  params,
}: ButtonEliminarAbonadoProps) {
  const [isCleaning, setIsCleaning] = useState(false);
  const [isCleaned, setIsCleaned] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleLimpiarNoAbonados = async () => {
    {
      setIsCleaning(true);
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API}/asiento/limpiar-no-abonado`,
          {
            localidad: params.localidad,
            zona: params.zona,
            tipo: params.tipo,
            asientosSeleccionados: params.asientosSeleccionados,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        toast.error("Error al eliminar el abonado");
        console.error(error);
      } finally {
        toast.success("Se ha eliminado el abonado");
        setTimeout(() => {
          window.location.reload();
        }, 1200);
        setIsCleaning(false);
        setIsCleaned(true);
      }
    }
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
                    onClick={handleLimpiarNoAbonados}
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
  };
}
