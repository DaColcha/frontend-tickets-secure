"use client";
//import { motion.button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { fadeIn } from "./variants";

export default function Localidades() {
  const router = useRouter();

  const handleButtonClick = (e: {
    currentTarget: { getAttribute: (arg0: string) => any };
  }) => {
    const tipo = e.currentTarget.getAttribute("data-tipo");
    const zona = e.currentTarget.getAttribute("data-zona");
    const localidad = e.currentTarget.getAttribute("data-localidad");
    router.push(`/localidades/${localidad}/${zona}/${tipo}`);
  };

  return (
    <main>
      <div className="mx-auto max-h-fit max-w-7xl px-2 py-2 lg:px-8 lg:py-6 shadow-xl bg-white">
        <motion.header
          variants={fadeIn("down", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          viewport={{ once: false, amount: 0.5 }}
        >
          <h1 className="text-xl text-center font-bold tracking-wider text-gray-900">
            SELECCIONE LA LOCALIDAD
          </h1>
        </motion.header>
        <div>
          <motion.section
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            viewport={{ once: false, amount: 0.5 }}
            className="flex justify-center"
          >
            <Link href="/localidades/general/b">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#cc0000] text-white w-[920px] h-[60px] p-4 rounded-lg"
              >
                GENERAL B
              </motion.button>
            </Link>
          </motion.section>
          <motion.section
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            viewport={{ once: false, amount: 0.5 }}
            className="flex justify-between mt-2 lg:px-[150px] lg:h-[60px]"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#163056] text-white text-center p-3"
              data-tipo="GRADAS"
              data-zona="B1"
              data-localidad="T"
              onClick={handleButtonClick}
            >
              GRADAS TRIBUNA B1
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#163056] text-white text-center p-3 lg:w-[480px]"
              data-tipo="SILLAS"
              data-zona="B1"
              data-localidad="T"
              onClick={handleButtonClick}
            >
              SILLAS TRIBUNA B1
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#163056] text-white text-center p-3"
              data-tipo="GRADAS"
              data-zona="B2"
              data-localidad="T"
              onClick={handleButtonClick}
            >
              GRADAS TRIBUNA B2
            </motion.button>
          </motion.section>
          <motion.section
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            viewport={{ once: false, amount: 0.5 }}
            className="flex justify-between items-center my-4 lg:px-[150px] lg:h-[30px]"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#163056] text-white p-2"
              data-tipo="BUTACAS"
              data-zona="B1"
              data-localidad="T"
              onClick={handleButtonClick}
            >
              BUTACAS TRIBUNA B1
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#163056] text-white text-center p-2 lg:w-[480px]"
              data-tipo="SILLAS"
              data-zona="B2"
              data-localidad="T"
              onClick={handleButtonClick}
            >
              SILLAS TRIBUNA B2
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#163056] text-white p-2"
              data-tipo="BUTACAS"
              data-zona="B2"
              data-localidad="T"
              onClick={handleButtonClick}
            >
              BUTACAS TRIBUNA B2
            </motion.button>
          </motion.section>
          <motion.section
            variants={fadeIn("down", 0.1)}
            initial="hidden"
            animate="show"
            exit="hidden"
            viewport={{ once: false, amount: 0.5 }}
            className="flex justify-between items-center mt-2 lg:px-[340px]"
          >
            <button disabled className="bg-orange-400 text-white  p-3">
              BANCA VISITA
            </button>
            <button disabled className="bg-orange-400 text-white  p-3 ">
              MESA CONTROL
            </button>
            <button disabled className="bg-orange-400 text-white  p-3">
              BANCA LEONES
            </button>
          </motion.section>
          <div className="relative mt-2">
            <motion.section
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 1 }}
              className="flex items-center justify-center"
            >
              <Image
                src="/assets/piso_cancha.png"
                alt="pisoCancha"
                width={500}
                height={500}
              />
            </motion.section>
            <section className="absolute inset-0 flex justify-between lg:px-[180px] ">
              <motion.div
                variants={fadeIn("right", 0.1)}
                initial="hidden"
                animate="show"
                exit="hidden"
                viewport={{ once: false, amount: 0.5 }}
                className="flex flex-col justify-between text-white "
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-[#6aa84f] h-[130px] text-white p-2"
                  data-tipo="SILLAS"
                  data-zona="A0"
                  data-localidad="C"
                  onClick={handleButtonClick}
                >
                  SILLAS CANCHA A
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-[#6aa84f] h-[130px] text-white  p-2"
                  data-tipo="SILLAS"
                  data-zona="B0"
                  data-localidad="C"
                  onClick={handleButtonClick}
                >
                  SILLAS CANCHA B
                </motion.button>
              </motion.div>
              <motion.div
                variants={fadeIn("left", 0.1)}
                initial="hidden"
                animate="show"
                exit="hidden"
                viewport={{ once: false, amount: 0.5 }}
                className="flex flex-col justify-between text-white "
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-[#6aa84f] h-[130px] text-white p-2"
                  data-tipo="SILLAS"
                  data-zona="D1"
                  data-localidad="C"
                  onClick={handleButtonClick}
                >
                  SILLAS CANCHA D1
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-[#6aa84f] h-[130px] text-white  p-2"
                  data-tipo="SILLAS"
                  data-zona="D0"
                  data-localidad="C"
                  onClick={handleButtonClick}
                >
                  SILLAS CANCHA D
                </motion.button>
              </motion.div>
            </section>
          </div>
          <motion.section
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            animate="show"
            exit="hidden"
            viewport={{ once: false, amount: 0.5 }}
            className="flex items-center justify-center mt-2 "
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#6aa84f] text-white p-2 w-[550px]"
              data-tipo="SILLAS"
              data-zona="C0"
              data-localidad="C"
              onClick={handleButtonClick}
            >
              SILLAS CANCHA C
            </motion.button>
          </motion.section>
          <motion.section
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            viewport={{ once: false, amount: 0.5 }}
            className="flex justify-between items-center my-4 lg:px-[150px] lg:h-[30px]"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#163056] text-white p-2"
              data-tipo="BUTACAS"
              data-zona="A1"
              data-localidad="T"
              onClick={handleButtonClick}
            >
              BUTACAS TRIBUNA A1
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#163056] text-white p-2 lg:w-[480px]"
              data-tipo="SILLAS"
              data-zona="A2"
              data-localidad="T"
              onClick={handleButtonClick}
            >
              SILLAS TRIBUNA A2
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#163056] text-white p-2"
              data-tipo="BUTACAS"
              data-zona="A2"
              data-localidad="T"
              onClick={handleButtonClick}
            >
              BUTACAS TRIBUNA A2
            </motion.button>
          </motion.section>
          <motion.section
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            viewport={{ once: false, amount: 0.5 }}
            className="flex justify-between mt-2 lg:px-[150px] lg:h-[60px]"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#163056] text-white  p-3"
              data-tipo="GRADAS"
              data-zona="A1"
              data-localidad="T"
              onClick={handleButtonClick}
            >
              GRADAS TRIBUNA A1
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#163056] text-white  p-3 lg:w-[480px] "
              data-tipo="SILLAS"
              data-zona="A1"
              data-localidad="T"
              onClick={handleButtonClick}
            >
              SILLAS TRIBUNA A1
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#163056] text-white p-3"
              data-tipo="GRADAS"
              data-zona="A2"
              data-localidad="T"
              onClick={handleButtonClick}
            >
              GRADAS TRIBUNA A2
            </motion.button>
          </motion.section>
          <motion.section
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            viewport={{ once: false, amount: 0.5 }}
            className="flex justify-center mt-2"
          >
            <Link href="/localidades/general/a">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#cc0000] text-white w-[920px] h-[60px] p-4"
              >
                GENERAL A
              </motion.button>
            </Link>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
