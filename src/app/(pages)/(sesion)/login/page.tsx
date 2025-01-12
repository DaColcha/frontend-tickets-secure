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
import {useState} from "react";
import {motion} from "framer-motion";
import {fadeIn} from "../../localidades/variants";
import OTP from "@/components/OTP";

export default function Login() {
    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState(false);
    const [exist, setExist] = useState(false);
    const [openOTP, setOpenOTP] = useState(false);

    const handleSubmitLogin = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/auth/login`,
                {
                    usuario: usuario,
                    contrasena: contraseña,
                }
            );

            if (response.status === 200) {
                console.log(response.data);
                setOpenOTP(true);
            }
        } catch (error) {
            if ((error as any).response.status === 400) {
                setError(true);
            } else if ((error as any).response.status === 404) {
                setExist(true);
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-[#163056] flex-col justify-center px-6 py-12 lg:px-8">
            <motion.div
                variants={fadeIn("down", 0.1)}
                initial="hidden"
                animate="show"
                exit="hidden"
                viewport={{once: false, amount: 0.5}}
                className="sm:mx-auto sm:w-full sm:max-w-sm"
            >
                {/* { <Image
          src="/assets/logoLeones_2.png"
          alt="LogoLeones"
          width={250}
          height={250}
          className="mx-auto "
        />} */}
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
                viewport={{once: false, amount: 0.5}}
            >
                <Card className="mt-10 p-5 border-3 border-[#d4b47e] sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmitLogin}>
                        <CardHeader className="flex flex-col justify-center items-center">
                            {<Image
                                src="/assets/logoLeones.png"
                                alt="LogoLeones"
                                width={150}
                                height={150}
                            />}
                            <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
                                INICIAR SESIÓN
                            </h1>
                            <p className="text-center text-black">Ingrese las credenciales</p>
                        </CardHeader>
                        <Divider className="bg-[#d4b47e]"/>
                        <div>
                            <Input
                                variant="faded"
                                isRequired
                                id="usuario"
                                type="text"
                                label="Sitio de venta"
                                labelPlacement="inside"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                className="block w-full  ring-gray-300  sm:text-sm sm:leading-6"
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
