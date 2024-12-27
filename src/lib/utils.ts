import CryptoJS from "crypto-js";
import {Tarjeta} from "@/types/pago";

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