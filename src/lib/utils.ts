import CryptoJS from "crypto-js";
import { Tarjeta } from "@/types/pago";

export const encryptCardData = async (cardData: Tarjeta) => {
  const key = CryptoJS.enc.Base64.parse(process.env.NEXT_PUBLIC_ENCRYPTION_KEY!);

  // Cifrado de los datos
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(cardData),
    key,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
  );

  return encrypted.toString();
};

export const validateCardNumber = (cardNumber: string): boolean => {
  const cleanedCardNumber = cardNumber.replace(/\D/g, "");
  if (cleanedCardNumber.length < 13 || cleanedCardNumber.length > 19) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < cleanedCardNumber.length; i++) {
    let digit = parseInt(cleanedCardNumber[i], 10);
    if ((cleanedCardNumber.length - i) % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  return sum % 10 === 0;
};

export const validateCardName = (name: string): boolean => {
  return /^[A-Za-z\s]+$/.test(name);
};

export const validateExpirationDate = (date: string): boolean => {
  if (!/^\d{2}\/\d{2}$/.test(date)) {
    return false;
  }

  const [month, year] = date.split("/").map(Number);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }

  return month >= 1 && month <= 12;
};

export const validateCCV = (ccv: string): boolean => {
  return /^\d{3,4}$/.test(ccv);
};