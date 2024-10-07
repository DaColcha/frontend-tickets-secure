import { Card } from "@nextui-org/react";
import { BarChart, EventProps } from "@tremor/react";
import { useEffect, useState } from "react";
import { FaReceipt } from "react-icons/fa6";

export default function VendidosGeneral() {
  const [value, setValue] = useState<EventProps>(null);
  const [chartData, setChartData] = useState([]);
  const [totalVendidos, setTotalVendidos] = useState(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/reporte/vendidos/general`)
      .then((response) => response.json())
      .then((data) => {
        setChartData(data);

        const totalVendidosSum = data.reduce(
          (sum: number, item: any) => sum + item.vendidos,
          0
        );

        setTotalVendidos(totalVendidosSum);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Card className="p-6">
        <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Total boletos vendidos en <strong>General</strong>
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
          index="zona"
          categories={["vendidos", "disponibles"]}
          colors={["red", "lime"]}
          yAxisWidth={30}
          onValueChange={(v) => setValue(v)}
        />
      </Card>
    </>
  );
}
