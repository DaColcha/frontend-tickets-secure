'use client'

import { Tarjeta } from "@/types/pago";
import { Button, Input, ModalFooter, Spinner } from "@nextui-org/react";
import { useState } from "react";

interface Props {
  onClose: () => void;
  dataCreditCard: Tarjeta;
  onUpdateCreditCard: (data: Tarjeta) => void;
}

export default function CreditCard({ onClose, dataCreditCard, onUpdateCreditCard }: Props) {

  const [cardNumber, setCardNumber] = useState(dataCreditCard.numero);
  const [cardError, setCardError] = useState("");
  const [cardName, setCardName] = useState(dataCreditCard.nombreTitular);
  const [ccvNumber, setCcvNumber] = useState(dataCreditCard.cvv);
  const [expirationDate, setExpirationDate] = useState(dataCreditCard.fechaVencimiento);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const creditCardData: Tarjeta = {
      numero: cardNumber,
      nombreTitular: cardName,
      cvv: ccvNumber,
      fechaVencimiento: expirationDate,
    }
    console.log(creditCardData);
    onUpdateCreditCard(creditCardData);
    onClose();
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        id="cardNumber"
        label="Número de Tarjeta"
        isRequired={true}
        type="number"
        value={cardNumber}
        errorMessage={cardError}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <Input
        id="cardName"
        label="Nombre del Titular"
        isRequired={true}
        type="text"
        value={cardName}
        errorMessage={cardError}
        onChange={(e) => setCardName(e.target.value)}
      />
      <Input
        id="ccv"
        label="CCV"
        isRequired={true}
        type="number"
        value={ccvNumber}
        errorMessage={cardError}
        onChange={(e) => setCcvNumber(e.target.value)}
      />
      <Input
        id="expirationDate"
        label="Fecha de Vencimiento"
        isRequired={true}
        type="text"
        maxLength={5}
        value={expirationDate}
        errorMessage={cardError}
        onChange={(e) => {
          let value = e.target.value;
          value = value.replace(/\D/g, "");
          if (value.length > 2) {
            value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
          }
          if (value.length <= 5) {
            setExpirationDate(value);
          }
        }}
      />
      <ModalFooter>
        <Button
          className="w-full bg-red-500 text-white font-semibold"
          onPress={onClose}
        >
          Atras
        </Button>
        <Button
          type="submit"
          className="w-full bg-[#163056] text-white font-semibold"
        >
          {isSubmitting ? <Spinner /> : "Finalizar"}
        </Button>
      </ModalFooter>
    </form>
  )
}