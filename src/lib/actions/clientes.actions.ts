import { toast } from "sonner";

export async function getClientes(token: string) {
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

export async function getClienteById(id: string, token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/clientes/validar`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "Authorization": `Bearer ${token}`,
      },
      body: id,
    });
    if (!response.ok) {
      throw new Error("Error al obtener el cliente");
    }
    return await response.json();
  } catch (error) {
    toast.info("El cliente no existe ingrese sus datos");
  }
}
