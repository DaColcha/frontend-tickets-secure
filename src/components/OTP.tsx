'use client'

import { FormEvent, useState } from "react";
import { Flex, Input, Typography } from 'antd';
import type { GetProps } from 'antd';
import Overlay from "./Overlay";
import { Button } from "@nextui-org/react";
import { postCodeOtp } from "@/lib/actions/login.actions";
import axios from "axios";

type OTPProps = GetProps<typeof Input.OTP>;

const { Title } = Typography;

interface Props {
    onClick?: () => void;
    username: string;
}

export default function OTP({ onClick, username }: Props) {

    const [otpValue, setOtpValue] = useState("");

    const onChange: OTPProps['onChange'] = (text) => {
        console.log('onChange:', text);
        setOtpValue(text)
    };

    const onInput: OTPProps['onInput'] = (value) => {
        console.log('onInput:', value);
    };

    const sharedProps: OTPProps = {
        onChange,
        onInput,
    };

    const handleVerifyOtp = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        const datosOtp = {
            username: username as string,
            otp: otpValue as string,
        };
        console.log(datosOtp);

        try {
            const response = await postCodeOtp(datosOtp);
            sessionStorage.setItem("usuario", response.usuario);
            sessionStorage.setItem("nombreSitio", response.sitio);
            sessionStorage.setItem("token", response.token);
            sessionStorage.setItem("rol", response.rol);

            console.log('datos recibidos', response);

            if (response && response.token) {
                const res = await axios.post('/api/setCookie', {
                    token: response.token,
                    rol: response.rol,
                })

                if (res.data.success) {
                    // Redirigir según el rol
                    if (response.rol === "admin") {
                        window.location.href = "/panel";
                    } else {
                        window.location.href = "/localidades";
                    }
                }

            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Overlay>
            <div className='w-auto bg-white border-[#d4b47e] border-3 rounded-2xl p-5 z-50'>
                <form className='flex flex-col gap-4' onSubmit={handleVerifyOtp}>
                    <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-black">
                        Ingrese el código de verificación
                    </h1>
                    <Flex gap="middle" align="flex-center" vertical>
                        <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
                    </Flex>
                    <div className='flex gap-2'>
                        <Button
                            className="bg-gray-500 text-white text-center w-full font-semibold"
                            onClick={onClick}
                        >
                            Volver a intentar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#9c0f2f] text-white text-center w-full font-semibold"
                        >
                            Validar Còdigo
                        </Button>
                    </div>
                </form>
            </div>
        </Overlay>
    )
}