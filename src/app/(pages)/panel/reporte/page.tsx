"use client";

import React from "react";

import { motion } from "framer-motion";

import { fadeIn } from "../../localidades/variants";
import TotalBoletosVendidos from "@/components/Panel/Charts/TotalBoletosVendidos";

import "react-multi-carousel/lib/styles.css";
import VendidosCancha from "@/components/Panel/Charts/VendidosCancha";
import { TotalGanancias } from "@/components/Panel/Charts/TotalGanancias";
import VendidosTribuna from "@/components/Panel/Charts/VendidosTribuna";
import VendidosGeneral from "@/components/Panel/Charts/VendidosGeneral";
import TotalAbonados from "@/components/Panel/Charts/TotalAbonados";

export default function Reporte(this: any) {
  return (
    <>
      <main>
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          animate="show"
          exit="hidden"
          viewport={{ once: false, amount: 0.5 }}
          className="mx-auto py-6 px-2 sm:px-6 lg:px-8"
        >
          <div className="sm:grid sm:grid-cols-6 sm:grid-rows-6 flex flex-col gap-4 pb-5">
            <div className="col-span-2 row-span-2">
              <VendidosCancha />
            </div>
            <div className="col-span-2 row-span-2 col-start-3">
              <VendidosTribuna />
            </div>
            <div className="col-span-2 row-span-2 col-start-5">
              <VendidosGeneral />
            </div>
            <div className="col-span-3 row-span-2 row-start-3">
              <TotalBoletosVendidos />
            </div>
            <div className="col-span-3 row-span-2 col-start-4 row-start-3">
              <TotalAbonados />
            </div>
            <div className="col-span-4 row-span-2 col-start-2 row-start-5">
              <TotalGanancias />
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
