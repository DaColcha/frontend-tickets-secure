import { toast } from "sonner";

interface NoAbonadosProps {
  params: {
    localidad: string;
    zona: string;
    tipo: string;
  };
  groupSelected: number[];
}

const token = sessionStorage.getItem("token")

export async function limpiarNoAbonados({
  params,
  groupSelected,
}: NoAbonadosProps) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/asiento/limpiar-no-abonado`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          localidad: params.localidad,
          zona: params.zona,
          tipo: params.tipo,
          asientosSeleccionados: groupSelected,
        }),
      }
    );

    toast.success("Asientos limpiados correctamente");
    return await res.json();
  } catch (error) {
    console.log("error", error);
  }
}
