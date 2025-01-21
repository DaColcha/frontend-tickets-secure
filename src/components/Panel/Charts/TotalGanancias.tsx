import { Card } from "@nextui-org/react";
import { BarChart, EventProps } from "@tremor/react";
import { useEffect, useState } from "react";
import {useAuth} from "@/context/AuthContext";

export function TotalGanancias() {
  const [chartData, setChartData] = useState([]);
  const [totalGananciaSum, setTotalGananciaSum] = useState(0);
  const [value, setValue] = useState<EventProps>(null);
  const {user} = useAuth();
  useEffect(() => {
      if (!user?.token) return;
    fetch(`${process.env.NEXT_PUBLIC_API}/reporte/ganancias`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user?.token}`,
            },
        }
        )
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item: any) => ({
          ...item,
          localidad_tipo: `${item.localidad} ${item.tipo}`,
        }));
        setChartData(formattedData);

        const totalGananciaSum = formattedData.reduce(
          (sum: number, item: any) => sum + item.totalGanancia,
          0
        );

        setTotalGananciaSum(totalGananciaSum);
      })
      .catch((error) => console.log(error));
  }, [user?.token]);

  const dataFormatter = (number: number) =>
    `$${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <>
      <Card className="p-5">
        <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Total ingresos (USD)
        </h3>
        <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
          {"$"}
          {totalGananciaSum}
        </p>
        <BarChart
          className="mt-6"
          data={chartData}
          index="localidad_tipo"
          categories={["totalGanancia", "totalVendidos"]}
          colors={["lime", "blue"]}
          yAxisWidth={48}
          onValueChange={(v) => setValue(v)}
        />
      </Card>
    </>
  );
}
