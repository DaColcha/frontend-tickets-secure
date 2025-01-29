"use client";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../localidades/variants";
import OTP from "@/components/OTP";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(false);
  const [exist, setExist] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const handleSubmitLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/login`,
        {
          usuario: usuario,
          contrasena: contraseña,
        }
      );

      if (response.status === 200) {
        setOpenOTP(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data || "Error desconocido";

          if (error.response.status === 400 && errorMessage.includes("bloqueada temporalmente")) {
            const blockedTime = new Date().getTime() + 15 * 60 * 1000;
            localStorage.setItem("blockedUntil", blockedTime.toString());
            setBlockedUntil(blockedTime);
            setError(true);
            setErrorMessage(errorMessage);
          } else if (error.response.status === 400) {
            setError(true);
            setErrorMessage(errorMessage);
          } else if (error.response.status === 404) {
            setExist(true);
            setErrorMessage("Usuario no registrado");
          } 
        } else {
          setErrorMessage("Error de red. Inténtalo de nuevo más tarde.");
        }
      } else {
        setErrorMessage("Ocurrió un error inesperado.");
      }
    }
  };

  useEffect(() => {
    const blokedTime = localStorage.getItem("blockedUntil");
    if (blokedTime) {
      const currentTime = new Date().getTime();
      if (currentTime < parseInt(blokedTime)) {
        setBlockedUntil(parseInt(blokedTime));
      } else {
        localStorage.removeItem("blockedUntil");
      }
    }
  }, []);

  useEffect(() => {
    if (blockedUntil) {
      const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const remainingTime = blockedUntil - currentTime;

        if (remainingTime <= 0) {
          setBlockedUntil(null);
          localStorage.removeItem("blockedUntil");
          setTimeLeft(null);
          clearInterval(interval);
        } else {
          setTimeLeft(Math.floor(remainingTime / 1000));
        }
      }, 1000)

      return () => clearInterval(interval);
    }
  }, [blockedUntil]);

  return (
    <div className="flex min-h-screen bg-[#163056] flex-col justify-center px-6 py-12 lg:px-8">
      <motion.div
        variants={fadeIn("down", 0.1)}
        initial="hidden"
        animate="show"
        exit="hidden"
        viewport={{ once: false, amount: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-sm"
      >
        <Divider
          className="bg-[#d4b47e] text-center mt-5"
          orientation="horizontal"
        />
      </motion.div>
      <motion.div
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        animate="show"
        exit="hidden"
        viewport={{ once: false, amount: 0.5 }}
      >
        <Card className="mt-10 p-5 border-3 border-[#d4b47e] sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmitLogin}>
            <CardHeader className="flex flex-col justify-center items-center">
              <Image
                src="/assets/logoLeones.png"
                alt="LogoLeones"
                width={150}
                height={150}
              />
              <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
                INICIAR SESIÓN
              </h1>
              <p className="text-center text-black">Ingrese las credenciales</p>
            </CardHeader>
            <Divider className="bg-[#d4b47e]" />
            <div>
              <Input
                variant="faded"
                isRequired
                id="usuario"
                type="text"
                label="Usuario"
                labelPlacement="inside"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="block w-full ring-gray-300 sm:text-sm sm:leading-6"
              />
              {exist && (
                <p className="text-red-500 text-start text-xs ml-4">
                  Usuario no registrado
                </p>
              )}
            </div>
            <div>
              <Input
                variant="faded"
                isRequired
                type="password"
                id="contraseña"
                label="Contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
              {error && (
                <p className="text-red-500 text-start text-xs ml-4">
                  Contraseña incorrecta
                </p>
              )}
            </div>
            <CardFooter>
              <Button
                type="submit"
                className="bg-[#9c0f2f] text-white text-center w-full font-semibold"
              >
                Ingresar
              </Button>
            </CardFooter>
            {errorMessage && (
              <p className="text-red-500 text-center text-sm mt-2">
                {errorMessage}
                {timeLeft !== null && (
                  <span>
                    <br />
                    Tiempo restante: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
                  </span>
                )}
              </p>
            )}
          </form>
        </Card>
      </motion.div>
      {openOTP && (
        <OTP
          onClick={() => {
            setOpenOTP(false);
          }}
          username={usuario}
        />
      )}
    </div>
  );
}