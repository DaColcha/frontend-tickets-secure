"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import { DownloadIcon } from "@/components/DownloadIcon";
import PDFGenerate from "@/components/PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TablaClientes from "@/components/Clientes/TablaClientes";
import { SearchIcon } from "@/components/icons/SearchIcon";

import {
  getGeneral,
  postGeneral,
  postGeneralAbonado,
} from "@/lib/actions/general.actions";
import { useAuth } from "@/context/AuthContext";

export default function LocalidadA() {
  const [tickets, setTickets] = useState(null);
  const [isLoading] = useState(false);
  const [cantidad, setCantidad] = useState(0);
  const [nombreSitio, setNombreSitio] = useState("");
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tipoCompra, setTipoCompra] = useState("abonado");
  const [tipoPago, setTipoPago] = useState("");
  const [plazo, setPlazo] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [groupSelected] = React.useState([]);
  const onCloseRef = useRef<() => void>(() => { });
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [clientNameDisabled, setClientNameDisabled] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [phoneDisabled, setPhoneDisabled] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const modal2 = useDisclosure();
  const { user } = useAuth();

  useEffect(() => {
    setNombreSitio(sessionStorage.getItem("nombreSitio") || "");
    fetchGeneralA();
  }, []);

  const fetchGeneralA = async () => {
    const data = await getGeneral({ zona: "A" }, user?.token || '');
    setTickets(data);
  };

  const handleConfirmarNoAbonado = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    const dataToSend = {
      zona: "A",
      boletos: cantidad,
    };

    try {
      await postGeneral(dataToSend, user?.token || '');
      onCloseRef.current();
      toast.success("Compra realizada con éxito");
      setIsSubmitting(false);
      await fetchGeneralA();
    } catch (error) {
      toast.error("Error al realizar la compra");
    }
  };

  const handleConfirmarAbonado = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    const dataToSend = {
      params: {
        zona: "A",
        comprador: {
          correoComprador: email,
          nombreComprador: clientName,
          telefonoComprador: phone,
        },
        cantidadBoletos: cantidad,
        sitioVenta: nombreSitio,
        pago: tipoPago,
        plazo: `${plazo} meses`,
      },
    };

    try {
      await postGeneralAbonado(dataToSend, user?.token || '');
      onCloseRef.current();
      toast.success("Compra realizada con éxito");
      setIsSubmitting(false);
      await fetchGeneralA();
    } catch (error) {
      toast.error("Error al realizar la compra");
    }
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value);
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "email") {
      setEmail(value);

      if (!validateEmail(value)) {
        setEmailError("Correo no válido");
      } else {
        setEmailError("");
      }
    } else if (id === "phone") {
      setPhone(value);

      if (value.length < 10) {
        setPhoneError("Teléfono no válido");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleClienteSeleccionado = (cliente: any) => {
    setClientName(cliente.nombreComprador);
    setEmail(cliente.correoComprador);
    setPhone(cliente.telefonoComprador);
    modal2.onClose();
    setClientNameDisabled(true);
    setEmailDisabled(true);
    setPhoneDisabled(true);
  };

  return (
    <>
      <main>
        <div className="mx-auto max-h-fit  max-w-7xl py-6 sm:px-6 lg:px-8">
          <section className="p-4 md:p-6 gap-4">
            <div className="lg:inline-flex grid grid-cols-1  gap-4">
              <motion.div
                variants={fadeIn("right", 0.1)}
                initial="hidden"
                animate="show"
                exit="hidden"
                viewport={{ once: false, amount: 0.5 }}
              >
                <Card className="h-fit p-4">
                  <Image
                    src="/assets/GENERAL-A.png"
                    alt="guia"
                    width={500}
                    height={300}
                  />
                </Card>
              </motion.div>
              <motion.div
                variants={fadeIn("left", 0.1)}
                initial="hidden"
                animate="show"
                exit="hidden"
                viewport={{ once: false, amount: 0.5 }}
              >
                <Card className="w-full p-5">
                  <CardHeader className="flex items-center gap-4 text-2xl font-bold">
                    <h1>Localidad: General A</h1>
                  </CardHeader>
                  <CardBody>
                    <div className="flex flex-col gap-4">
                      <h1 className="flex flex-1 font-bold text-4xl ">
                        Boletos disponibles:
                        <p className="font-bold text-4xl text-green-400">
                          {tickets}
                        </p>
                      </h1>
                      <Input
                        className="w-fit"
                        type="number"
                        id="cantidad"
                        label="Cantidad de boletos"
                        isRequired
                        onChange={(e) => setCantidad(Number(e.target.value))}
                      />
                      {isLoading && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <Spinner />
                        </div>
                      )}
                    </div>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <div className="flex w-full flex-1 gap-4 ">
                      <Link className="w-full" href="/localidades">
                        <Button
                          className="w-full bg-red-500 text-white font-semibold"
                          color="danger"
                        >
                          Atrás
                        </Button>
                      </Link>
                      <Button
                        onPress={onOpen}
                        className="w-full bg-[#163056] font-semibold"
                        color="primary"
                      >
                        Continuar
                      </Button>
                      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                          {(onClose) => {
                            onCloseRef.current = onClose;
                            return (
                              <>
                                <ModalHeader className="flex flex-col gap-1">
                                  Información
                                </ModalHeader>
                                <ModalBody>
                                  <form
                                    className="grid gap-4"
                                    onSubmit={
                                      tipoCompra === "abonado"
                                        ? handleConfirmarAbonado
                                        : handleConfirmarNoAbonado
                                    }
                                  >
                                    <RadioGroup
                                      id="tipo-compra"
                                      orientation="horizontal"
                                      value={tipoCompra}
                                      onChange={(e) =>
                                        setTipoCompra(e.target.value)
                                      }
                                    >
                                      <Radio value="abonado">Abonado</Radio>
                                      <Radio value="no-abonado">
                                        No abonado
                                      </Radio>
                                    </RadioGroup>
                                    <p>Cantidad de boletos: {cantidad}</p>
                                    <Button
                                      startContent={<SearchIcon />}
                                      size="sm"
                                      onPress={modal2.onOpen}
                                      className="w-fit  bg-[#163056] font-semibold"
                                      color="primary"
                                    >
                                      Cliente existente
                                    </Button>
                                    <Modal
                                      size="xl"
                                      placement="center"
                                      isOpen={modal2.isOpen}
                                      onClose={modal2.onClose}
                                    >
                                      <ModalContent>
                                        {(onClose) => {
                                          onCloseRef.current = onClose;
                                          return (
                                            <>
                                              <ModalHeader className="flex justify-center text-xl">
                                                Información de clientes
                                              </ModalHeader>
                                              <ModalBody>
                                                <TablaClientes
                                                  onClienteSeleccionado={
                                                    handleClienteSeleccionado
                                                  }
                                                />
                                              </ModalBody>
                                            </>
                                          );
                                        }}
                                      </ModalContent>
                                    </Modal>

                                    <Input
                                      disabled={clientNameDisabled}
                                      id="first-name"
                                      label="Nombre"
                                      isRequired={tipoCompra === "abonado"}
                                      value={clientName}
                                      onChange={(e) => handleFirstNameChange(e)}
                                    />

                                    <Input
                                      disabled={emailDisabled}
                                      id="email"
                                      label="Correo"
                                      isRequired={tipoCompra === "abonado"}
                                      type="email"
                                      value={email}
                                      errorMessage={emailError}
                                      onChange={(e) => handleInputChange(e)}
                                    />
                                    <Input
                                      disabled={phoneDisabled}
                                      id="phone"
                                      label="Teléfono"
                                      isRequired={tipoCompra === "abonado"}
                                      type="tel"
                                      value={phone}
                                      errorMessage={phoneError}
                                      onChange={(e) => handleInputChange(e)}
                                      maxLength={10}
                                    />

                                    <Select
                                      id="metodo-pago"
                                      isRequired={tipoCompra === "abonado"}
                                      label="Forma de pago"
                                      placeholder="Seleccione la forma de pago"
                                      value={tipoPago}
                                      onChange={(e) =>
                                        setMetodoPago(e.target.value)
                                      }
                                    >
                                      <SelectItem key="contado">
                                        Contado
                                      </SelectItem>
                                      <SelectItem key="credito">
                                        Crédito
                                      </SelectItem>
                                    </Select>

                                    {metodoPago === "contado" && (
                                      <Select
                                        id="metodo-pago-contado"
                                        isRequired={tipoCompra === "abonado"}
                                        label="Método de pago"
                                        placeholder="Seleccione el método de pago"
                                        value={metodoPago}
                                        onChange={(e) =>
                                          setTipoPago(e.target.value)
                                        }
                                      >
                                        <SelectItem key={1}>
                                          Efectivo
                                        </SelectItem>
                                        <SelectItem key={2}>
                                          Transferencia
                                        </SelectItem>
                                      </Select>
                                    )}

                                    {metodoPago === "credito" && (
                                      <>
                                        <Select
                                          id="metodo-pago-credito"
                                          isRequired={tipoCompra === "abonado"}
                                          label="Método de pago"
                                          placeholder="Seleccione el método de pago"
                                          value={metodoPago}
                                          onChange={(e) =>
                                            setTipoPago(e.target.value)
                                          }
                                        >
                                          <SelectItem key={3}>
                                            Tarjeta de crédito
                                          </SelectItem>
                                          <SelectItem key={4}>
                                            Convenio instituciones
                                          </SelectItem>
                                        </Select>
                                        <Input
                                          className="max-w-fit"
                                          id="plazo"
                                          label="Plazos en meses"
                                          isRequired={tipoCompra === "abonado"}
                                          type="number"
                                          value={plazo}
                                          onChange={(e) =>
                                            setPlazo(e.target.value)
                                          }
                                          maxLength={10}
                                        />
                                      </>
                                    )}

                                    <div className="text-center">
                                      <PDFDownloadLink
                                        document={
                                          <PDFGenerate
                                            data={{
                                              nombre: clientName,
                                              email: email,
                                              telefono: phone,
                                              tipoCompra: tipoCompra,
                                              metodoPago: metodoPago,
                                              tipoPago: tipoPago,
                                              asientos:
                                                groupSelected.join(", "),
                                              sitioVenta: nombreSitio,
                                              pago: tipoPago,
                                              plazo: plazo,
                                              zona: "A",
                                            }}
                                          />
                                        }
                                        fileName="comprobante.pdf"
                                      >
                                        <>
                                          {isLoading ? (
                                            <Spinner />
                                          ) : (
                                            <Button
                                              size="sm"
                                              endContent={<DownloadIcon />}
                                              className="w-fit bg-green-300 text-black font-semibold"
                                            >
                                              Descargar comprobante
                                            </Button>
                                          )}
                                        </>
                                      </PDFDownloadLink>
                                    </div>

                                    <Divider />

                                    <ModalFooter>
                                      <Button
                                        className="w-full bg-red-500 text-white font-semibold"
                                        onPress={onClose}
                                      >
                                        Cancelar
                                      </Button>
                                      <Button
                                        type="submit"
                                        className="w-full bg-[#163056] text-white font-semibold"
                                      >
                                        {isSubmitting ? (
                                          <Spinner />
                                        ) : (
                                          "Finalizar"
                                        )}
                                      </Button>
                                    </ModalFooter>
                                  </form>
                                </ModalBody>
                              </>
                            );
                          }}
                        </ModalContent>
                      </Modal>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
              <Toaster richColors position="bottom-center" />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
