'use client'

import { validateCardName, validateCardNumber, validateCCV, validateExpirationDate } from "@/lib/utils";
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
  const [cardName, setCardName] = useState(dataCreditCard.nombreTitular);
  const [ccvNumber, setCcvNumber] = useState(dataCreditCard.cvv);
  const [expirationDate, setExpirationDate] = useState(dataCreditCard.fechaVencimiento);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [cardNumberError, setCardNumberError] = useState("");
  const [cardNameError, setCardNameError] = useState("");
  const [ccvError, setCcvError] = useState("");
  const [expirationDateError, setExpirationDateError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    let isValid = true;

    if (!validateCardNumber(cardNumber)) {
      setCardNumberError("Número de tarjeta inválido");
      isValid = false;
    } else {
      setCardNumberError("");
    }

    if (!validateCardName(cardName)) {
      setCardNameError("Nombre inválido (solo letras y espacios)");
      isValid = false;
    } else {
      setCardNameError("");
    }

    if (!validateCCV(ccvNumber)) {
      setCcvError("CCV inválido (debe tener 3 dígitos)");
      isValid = false;
    } else {
      setCcvError("");
    }

    if (!validateExpirationDate(expirationDate)) {
      setExpirationDateError("Fecha de vencimiento inválida (MM/YY)");
      isValid = false;
    } else {
      setExpirationDateError("");
    }

    if (isValid) {
      const creditCardData: Tarjeta = {
        numero: cardNumber,
        nombreTitular: cardName,
        cvv: ccvNumber,
        fechaVencimiento: expirationDate,
      };
      onUpdateCreditCard(creditCardData);
      onClose();
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <Input
          id="cardNumber"
          label="Número de Tarjeta"
          isRequired={true}
          type="text"
          value={cardNumber}
          errorMessage={cardNumberError}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setCardNumber(value);
            setCardNumberError("");
          }}
        />
        {cardNumberError && <p className="text-red-500 text-xs ml-1">{cardNumberError}</p>}
      </div>
      <div>
        <Input
          id="cardName"
          label="Nombre del Titular"
          isRequired={true}
          type="text"
          value={cardName}
          errorMessage={cardNameError}
          onChange={(e) => {
            setCardName(e.target.value);
            setCardNameError("");
          }}
        />
        {cardNameError && <p className="text-red-500 text-xs ml-1">{cardNameError}</p>}
      </div>
      <div>
        <Input
          id="ccv"
          label="CCV"
          isRequired={true}
          type="password"
          value={ccvNumber}
          errorMessage={ccvError}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            if (value.length <= 3) {
              setCcvNumber(value);
              setCcvError("");
            }
          }}
        />
        {ccvError && <p className="text-red-500 text-xs ml-1">{ccvError}</p>}
      </div>
      <div>
        <Input
          id="expirationDate"
          label="Fecha de Vencimiento"
          isRequired={true}
          type="text"
          maxLength={5}
          value={expirationDate}
          errorMessage={expirationDateError}
          onChange={(e) => {
            let value = e.target.value;
            value = value.replace(/\D/g, "");
            if (value.length > 2) {
              value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
            }
            if (value.length <= 5) {
              setExpirationDate(value);
              setExpirationDateError("");
            }
          }}
        />
        {expirationDateError && <p className="text-red-500 text-xs ml-1">{expirationDateError}</p>}
      </div>
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
  );
}