import { toast } from "sonner";

const token = sessionStorage.getItem("token")

export async function getClientes() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/clientes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
