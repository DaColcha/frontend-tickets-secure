import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { toast } from "sonner";
import { FaCalendarXmark } from "react-icons/fa6";


export default function ButtonLimpiar() {
  const [isCleaning, setIsCleaning] = useState(false);
  const [isCleaned, setIsCleaned] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const limpiarAsientos = async () => {
    setIsCleaning(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/asiento/limpiar`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Error al limpiar los asientos");
      }
    } catch (error) {
      toast.error("Error al limpiar los asientos del partido");
    } finally {
      toast.success("Se han limpiado los asientos del partido");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
      setIsCleaning(false);
      setIsCleaned(true);
    }
  };
  return (
    <div className="flex flex-col items-center justify-items-center">
      <Button
        onPress={onOpen}
        variant="solid"
        color="primary"
        disabled={isCleaning}
        startContent={<FaCalendarXmark />}
      >
        {isCleaning ? <Spinner /> : "Limpiar partido"}
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
                ¿Está seguro de limpiar los boletos del partido?
              </ModalHeader>
              <ModalBody className="text-pretty">
                <p>
                  Recuerde que al limpiar por partido la información de compra
                  de los abonados permanece y el resto de compras se eliminará.
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
                  onClick={limpiarAsientos}
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
