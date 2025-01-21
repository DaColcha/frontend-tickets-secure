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
import { FaRegTrashCan } from "react-icons/fa6";
import {useAuth} from "@/context/AuthContext";

export default function ButtonLimpiarTodo() {
  const [isCleaning, setIsCleaning] = useState(false);
  const [isCleaned, setIsCleaned] = useState(false);
  const{user} = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const limpiarTodosAsientos = async () => {
    setIsCleaning(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/asiento/limpiar-todo`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user?.token}`,
            },
          }
      );

      if (!response.ok) {
        throw new Error("Error al limpiar los asientos");
      }
    } catch (error) {
      toast.error("Error al limpiar todos los asientos");
    } finally {
      toast.success("Se han limpiado todos los asientos");
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
      className="bg-[#9c0f2f] text-white"
        onPress={onOpen}
        variant="solid"
        color="danger"
        disabled={isCleaning}
        startContent={<FaRegTrashCan />}
      >
        {isCleaning ? <Spinner color="danger" /> : "Limpiar todo"}
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
                ¿Está seguro de limpiar todos los boletos?
              </ModalHeader>
              <ModalBody className="text-pretty">
                <p>
                  Recuerde que al limpiar todo también se elimina el registro de
                  compra de los abonados.
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
                  onClick={limpiarTodosAsientos}
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
