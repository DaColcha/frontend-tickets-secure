import { toast } from "sonner";

export async function getClientes() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/clientes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener los clientes");
    }
    return await response.json();
  } catch (error) {
    toast.error("Error al obtener los clientes");
  }
}
