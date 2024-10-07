/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { getTotalVendidosGeneral } from "@/lib/actions/total-vendidos.actions";

export default function CardGeneralTotal({ zona }: { zona: string }) {
  const [totalVendidosGeneral, setTotalVendidosGeneral] = useState<any[]>([]);
  const [totalDisponiblesGeneral, setTotalDisponiblesGeneral] = useState<any[]>(
    []
  );

  const fetchTotalVendidosGeneral = async () => {
    const totalVendidosGeneral = await getTotalVendidosGeneral({
      params: { zona },
    });
    setTotalVendidosGeneral(totalVendidosGeneral?.vendidos);
    setTotalDisponiblesGeneral(totalVendidosGeneral?.disponibles);
  };

  useEffect(() => {
    fetchTotalVendidosGeneral();
  }, [zona]);

  return (
    <>
      <Card className="p-5 ">
        <CardBody>
          <>
            <CardHeader className="text-3xl font-bold">
              General {zona}
            </CardHeader>
            <div className="flex flex-col items-center gap-2">
              <p className="bg-[#20a93e] gap-4 w-fit p-4 text-xl  text-white font-bold">
                Disponibles: {totalDisponiblesGeneral}
              </p>
              <p className="bg-[#9c0f2f] gap-4 w-fit p-4 text-xl  text-white font-bold">
                Vendidos: {totalVendidosGeneral}
              </p>
            </div>
          </>
        </CardBody>
      </Card>
    </>
  );
}
