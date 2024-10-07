import { toast } from "sonner";

interface LocalidadesPageProps {
  localidad: string;
  zona: string;
  tipo: string;
}

export async function postAsientos(asiento: any) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/compra`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(asiento),
    });
    if (!res.ok) {
      throw new Error("Error al crear la compra");
    }
    return await res.json();
  } catch (error) {
    toast.error("Error al enviar la solicitud");
  }
}

export async function getAsientos(params: LocalidadesPageProps) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/asiento/${params.localidad}/${params.zona}/${params.tipo}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Error al enviar la solicitud");
    }
    return await res.json();
  } catch (error) {
    toast.error("Error al obtener los asientos");
  }
}
