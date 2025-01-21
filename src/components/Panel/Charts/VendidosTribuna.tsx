import { Card } from "@nextui-org/react";
import { BarChart, EventProps } from "@tremor/react";
import { useEffect, useState } from "react";
import { FaReceipt } from "react-icons/fa6";
import {useAuth} from "@/context/AuthContext";

export default function VendidosTribuna() {
  const [value, setValue] = useState<EventProps>(null);
    const { user } = useAuth();
  const [chartData, setChartData] = useState([]);
  const [totalVendidos, setTotalVendidos] = useState(0);

  useEffect(() => {
      if (!user?.token) return;
    fetch(`${process.env.NEXT_PUBLIC_API}/reporte/vendidos/tribuna`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user?.token}`,
            },
        })
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item: any) => ({
          ...item,
          zona_tipo: `${item.zona} ${item.tipo}`,
        }));
        setChartData(formattedData);

        const totalGananciaSum = formattedData.reduce(
          (sum: number, item: any) => sum + item.vendidos,
          0
        );

        setTotalVendidos(totalGananciaSum);
      })
      .catch((error) => console.log(error));
  }, [user?.token]);

  return (
    <>
      <Card className="p-6">
        <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Total boletos vendidos en <strong>Tribuna</strong>
        </h3>
        <div className="inline-flex items-center gap-4">
          <FaReceipt className="w-8 h-8 " />
          <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {totalVendidos}
          </p>
        </div>
        <BarChart
          className="mt-6"
          data={chartData}
          index="zona_tipo"
          categories={["vendidos", "disponibles"]}
          colors={["red", "lime"]}
          yAxisWidth={30}
          onValueChange={(v) => setValue(v)}
        />
      </Card>
    </>
  );
}
