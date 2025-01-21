"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import ButtonLimpiar from "@/components/Panel/Buttons/ButtonLimpiar";
import ButtonLimpiarTodo from "@/components/Panel/Buttons/ButtonLimpiarTodo";
import { Toaster } from "sonner";
import TablaLocalidades from "@/components/Panel/TablaLocalidades";
import TablaGeneral from "@/components/Panel/TablaGeneral";
import CardGeneralTotal from "@/components/Panel/CardGeneralVendidos";
import { motion } from "framer-motion";
import { fadeIn } from "../localidades/variants";
import { getTotalVendidos } from "@/lib/actions/total-vendidos.actions";
import { useAuth } from "@/context/AuthContext";

export default function Panel() {
  const [totalVendidos, setTotalVendidos] = useState(0);
  const { user } = useAuth();



  const fetchTotalVendidos = async () => {
    if (user?.token) {
      const totalVendidos = await getTotalVendidos(user.token);
      setTotalVendidos(totalVendidos);
    }
  };

  useEffect(() => {
    fetchTotalVendidos();
  }, [user?.token]);

  return (
    <>
      <main>
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          animate="show"
          exit="hidden"
          viewport={{ once: false, amount: 0.5 }}
          className="mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-8"
        >
          <Toaster richColors position="bottom-center" />
          <Card className="mb-5">
            <CardHeader className="flex flex-row gap-2 text-center items-center justify-between">
              <p className="bg-[#9c0f2f] gap-4 w-fit p-4 text-2xl rounded-t-xl  text-white font-bold">
                Total boletos vendidos: {totalVendidos}
              </p>
              <div className="inline-flex gap-4">
                <ButtonLimpiar />
                <ButtonLimpiarTodo />
              </div>
            </CardHeader>
            <CardBody>
              <Divider className="mb-5" />
              <div className="text-center">
                <Tabs
                  size="lg"
                  aria-label="Options"
                  color="primary"
                  variant="solid"
                  classNames={{
                    tabList: "bg-[#163056] lg:w-[720px]",
                    cursor: "w-full bg-[#d4b47e]",
                    tabContent:
                      "text-white group-data-[selected=true]:text-[#163056] group-data-[selected=true]:font-semibold",
                  }}
                >
                  <Tab key="tribuna" title="Tribuna">
                    <TablaLocalidades localidad="tribuna" />
                  </Tab>
                  <Tab key="cancha" title="Cancha">
                    <TablaLocalidades localidad="cancha" />
                  </Tab>
                  <Tab key="general" title="General">
                    <div className="flex flex-1 w-full justify-evenly mb-4 gap-8">
                      <CardGeneralTotal zona="A" />
                      <CardGeneralTotal zona="B" />
                    </div>
                    <TablaGeneral />
                  </Tab>
                </Tabs>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </main>
    </>
  );
}
