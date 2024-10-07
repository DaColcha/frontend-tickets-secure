import { useEffect, useState } from "react";

export const maxColsValues: { [key: string]: any } = {
  T_A1_GRADAS: {
    style: "grid-cols-16",
    value: 16,
  },
  T_A2_GRADAS: {
    style: "grid-cols-16",
    value: 16,
  },
  T_B1_GRADAS: {
    style: "grid-cols-16",
    value: 16,
  },
  T_B2_GRADAS: {
    style: "grid-cols-16",
    value: 16,
  },
  T_B1_SILLAS: {
    style: "grid-cols-31",
    value: 31,
  },
  T_B2_SILLAS: {
    style: "grid-cols-39",
    value: 39,
  },
  T_A1_SILLAS: {
    style: "grid-cols-31",
    value: 31,
  },
  T_A2_SILLAS: {
    style: "grid-cols-39",
    value: 39,
  },
  T_A1_BUTACAS: {
    style: "grid-cols-18",
    value: 18,
  },
  T_A2_BUTACAS: {
    style: "grid-cols-18",
    value: 18,
  },
  T_B1_BUTACAS: {
    style: "grid-cols-18",
    value: 18,
  },
  T_B2_BUTACAS: {
    style: "grid-cols-18",
    value: 18,
  },
  C_A0_SILLAS: {
    style: "grid-cols-10",
    value: 10,
  },
  C_B0_SILLAS: {
    style: "grid-cols-15",
    value: 15,
  },
  C_C0_SILLAS: {
    style: "grid-cols-66",
    value: 65,
  },
  C_D0_SILLAS: {
    style: "grid-cols-13",
    value: 13,
  },
  C_D1_SILLAS: {
    style: "grid-cols-12",
    value: 12,
  },
  general_A: {
    style: "grid-cols-12",
    value: 12,
  },
  general_B: {
    style: "grid-cols-12",
    value: 12,
  },
};

export function useNombreSitio() {
  const [nombreSitio, setNombreSitio] = useState("");

  useEffect(() => {
    setNombreSitio(sessionStorage.getItem("nombreSitio") || "");
  }, []);

  return nombreSitio;
}

interface LocalidadParams {
  params: {
    localidad: string;
    zona: string;
    tipo: string;
  };
}
