import { Card } from "@nextui-org/react";
import { BarChart } from "@tremor/react";
import { useEffect, useState } from "react";
import { FaRegAddressCard } from "react-icons/fa6";

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export default function TotalAbonados() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/reporte/abonados`)
      .then((response) => response.json())
      .then((data) => {
        const total = data.reduce(
          (acc: any, item: { totalVendidos: any }) => acc + item.totalVendidos,
          0
        );
        setChartData(data);
        setTotalVendidos(total);
      })
      .catch((error) => console.log(error));
  }, []);

  const [totalVendidos, setTotalVendidos] = useState(0);

  return (
    <>
      <Card className="p-6 ">
        <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Total abonados vendidos
        </h3>
        <div className="inline-flex items-center gap-4">
          <FaRegAddressCard className="w-8 h-8 " />
          <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {totalVendidos}
          </p>
        </div>
        <BarChart
          data={chartData}
          index="tipoCompra"
          categories={["totalVendidos"]}
          colors={["amber"]}
          valueFormatter={dataFormatter}
          yAxisWidth={50}
        />
      </Card>
    </>
  );
}
