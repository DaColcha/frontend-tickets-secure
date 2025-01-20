import { toast } from "sonner";
import { LocalidadesPageProps } from "@/types/localidad";

interface LocalidadVendidosProps {
  params: {
    localidad: string;
  };
}

export async function getVendidosLocalidad({ params }: LocalidadesPageProps, token: string) {
  try {

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/asiento/${params.localidad}/${params.zona}/${params.tipo}/disponible`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los vendidos por localidad");
    }
    return await response.json();
  } catch (error) {
    toast.error("Error al obtener los vendidos por localidad");
  }
}

export async function getVendidos({ params }: LocalidadVendidosProps, token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/vendidos/${params.localidad}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los vendidos");
    }
    return await response.json();
  } catch (error) {
    toast.error("Error al obtener los vendidos");
  }
}

export async function getTotalVendidos(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/vendidos/total`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los total vendidos");
    }
    return await response.json();
  } catch (error) {
    toast.error("Error al obtener los total vendidos");
  }
}

export async function getTotalVendidosLocalidad({
  params,
}: LocalidadVendidosProps, token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/vendidos/${params.localidad}/total`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los total vendidos por localidad");
    }
    return await response.json();
  } catch (error) {
    toast.error("Error al obtener los total vendidos por localidad");
  }
}

export async function getVendidosGeneral(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/vendidos/general`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los vendidos general");
    }
    return await response.json();
  } catch (error) {
    toast.error("Error al obtener los vendidos general");
  }
}

interface GeneralVendidosProps {
  params: {
    zona: string;
  };
}

export async function getTotalVendidosGeneral({
  params,
}: GeneralVendidosProps, token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/vendidos/general/${params.zona}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los total vendidos general");
    }
    const data = await response.json();
    const disponibles = data.disponibles;
    const vendidos = data.vendidos;
    return { disponibles, vendidos };
  } catch (error) {
    toast.error("Error al obtener los total vendidos general");
  }
}
