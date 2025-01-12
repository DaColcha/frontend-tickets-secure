'use client'

import { Button, Input, ModalFooter, Spinner } from "@nextui-org/react";
import { useState } from "react";

interface Props {
  onClose: () => void;
}

export default function CreditCard({ onClose }: Props) {

  const [cardNumber, setCardNumber] = useState("");
  const [cardError, setCardError] = useState("");
  const [cardName, setCardName] = useState("");
  const [ccvNumber, setCcvNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form className="">
      <Input
        id="email"
        label="Correo"
        isRequired={true}
        type="email"
        value={cardNumber}
        errorMessage={cardError}
      />
      <Input
        id="cardName"
        label="Nombre en la tarjeta"
        isRequired={true}
        type="text"
        value={cardName}
        errorMessage={cardError}
      />
      <Input
        id="ccv"
        label="CCV"
        isRequired={true}
        type="number"
        value={ccvNumber}
        errorMessage={cardError}
      />
      <Input
        id="expirationDate"
        isRequired={true}
        type="date"
        value={expirationDate}
        errorMessage={cardError}
      />
      <ModalFooter>
        <Button
          className="w-full bg-red-500 text-white font-semibold"
          onPress={onClose}
        >
          Cancelar
        </Button>
        <Button
          type={"submit"}
          className="w-full bg-[#163056] text-white font-semibold"
        >
          {isSubmitting ? <Spinner /> : "Finalizar"}
        </Button>
      </ModalFooter>
    </form>
  )
}