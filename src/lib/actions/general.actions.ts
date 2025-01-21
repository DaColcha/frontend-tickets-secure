import { GeneralAbonado } from "@/types/general-no-abonado";
import { toast } from "sonner";

interface general {
  zona: string;
}

export async function getGeneral({ zona }: general, token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/zona-general/${zona}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Error al enviar la solicitud");
    }
    return await res.json();
  } catch (error) {
    toast.error("Error al obtener los datos generales");
  }
}

interface postGeneral {
  zona: string;
  boletos: number;
}

export async function postGeneral(asiento: any, token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/zona-general/compra`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(asiento),
    });
    if (!res.ok) {
      throw new Error("Error al crear la compra");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
