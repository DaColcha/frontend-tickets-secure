"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
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
import { SearchIcon } from "@/components/icons/SearchIcon";
import TablaClientes from "@/components/Clientes/TablaClientes";
import {
  getGeneral,
  postGeneral,
} from "@/lib/actions/general.actions";
import { useAuth } from "@/context/AuthContext";
import { postPayment } from "@/lib/actions/asientos.actions";
import { encryptCardData } from "@/lib/utils";
import { obtenerPrecioPorTipo } from "@/types/precio.asientos";
import { Tarjeta } from "@/types/pago";
import CreditCard from "@/components/CreditCard";
import { getClienteById } from "@/lib/actions/clientes.actions";

export default function LocalidadB() {
  const [tickets, setTickets] = useState(null);
  const [isLoading] = useState(false);
  const [cantidad, setCantidad] = useState(0);
  const [nombreSitio, setNombreSitio] = useState("");
  const [clientName, setClientName] = useState("");
  const [cedula, setCedula] = useState("");
  const [cedulaDisabled, setCedulaDisabled] = useState(false);
  const [aceptTerminos, setAceptTerminos] = useState(false);
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
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [dataCreditCard, setDataCreditCard] = useState<Tarjeta>({
    numero: "",
    nombreTitular: "",
    cvv: "",
    fechaVencimiento: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    setNombreSitio(sessionStorage.getItem("nombreSitio") || "");
    fetchGeneralA();
  }, []);

  const fetchGeneralA = async () => {
    const data = await getGeneral({ zona: "B" }, user?.token || '');
    setTickets(data);
  };

  const handleCedulaClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCedula(e.target.value);
  };

  const handleNameClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value);
  };

  const handlePostAsientos = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (!aceptTerminos) {
      toast.error("Debe aceptar los términos y condiciones");
      return;
    }

    if (tipoPago === "3" && !showCreditCard) {
      setShowCreditCard(true);
      return
    }

    setIsSubmitting(true);

    try {
      const precioAsiento = obtenerPrecioPorTipo("B");
      const total = precioAsiento * cantidad;

      const encryptedCardData = await encryptCardData(dataCreditCard);

      const dataPayment = {
        encryptedData: encryptedCardData,
        total: parseFloat(total.toFixed(2)),
        useCard: showCreditCard ? true : false,
        formaPago: tipoPago === "3" ? "Tarjeta crédito/débito" : metodoPago,
      }

      const resPayment = await postPayment(dataPayment, user?.token || '');

      const dataToSend = {
        zona: "B",
        cantidad: cantidad,
        comprador: {
          cedula: cedula,
          nombre: clientName,
          correo: email,
          telefono: phone,
        },
        tipoCompra: tipoCompra === "abonado" ? "A" : "N",
        vendedor: user?.usuario,
        idPago: resPayment.id,
      }
      await postGeneral(dataToSend, user?.token || '');

      onCloseRef.current();
      setIsSubmitting(false);
      await fetchGeneralA();
      toast.success("Compra realizada con éxito");

    } catch (error) {
      toast.error("Error al realizar la compra");
    } finally {
      setIsSubmitting(false);
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

  const handleClienteExistente = async () => {
    const data = await getClienteById(cedula, user?.token || '');
    if (data !== null || data !== undefined) {
      setCedula(data.cedula);
      setClientName(data.nombre);
      setEmail(data.correo);
      setPhone(data.telefono);
    } else if (data === null || data === undefined) {
      toast.info("El cliente no existe");
    }
  }

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
                    src="/assets/GENERAL-B.png"
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
                    <h1>Localidad: General B</h1>
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
                          <Spinner />{" "}
                          {/* Ajusta según el componente de Loader que estés utilizando */}
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
                      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                          {(onClose) => {
                            onCloseRef.current = onClose;
                            return (
                              <>
                                <ModalHeader className="flex justify-center text-xl">
                                  Nueva compra
                                </ModalHeader>
                                <ModalBody>
                                  {!showCreditCard ? (
                                    <>
                                      <div className="inline-flex gap-2 items-center">
                                        <p className="font-semibold text-lg">Asiento/s:</p>
                                        <p className="font-light">
                                          {cantidad}
                                        </p>
                                      </div>
                                      <div className="inline-flex gap-2 items-center">
                                        <p className="font-semibold text-lg">Precio: </p>
                                        <p className="font-light">
                                          $ {obtenerPrecioPorTipo("A") * cantidad}
                                        </p>
                                      </div>
                                      <Button
                                        startContent={<SearchIcon />}
                                        size="sm"
                                        onPress={handleClienteExistente}
                                        className="w-fit bg-[#163056] font-semibold"
                                        color="primary"
                                      >
                                        Cliente existente
                                      </Button>
                                      <form className="grid gap-4" onSubmit={handlePostAsientos}>
                                        {/* Campos del formulario */}
                                        <RadioGroup
                                          isRequired
                                          id="tipo-compra"
                                          orientation="horizontal"
                                          value={tipoCompra}
                                          color="primary"
                                          onChange={(e) => setTipoCompra(e.target.value)}
                                        >
                                          <Radio value="abonado">Abonado</Radio>
                                          <Radio value="no-abonado">No abonado</Radio>
                                        </RadioGroup>

                                        <Input
                                          disabled={cedulaDisabled}
                                          id="client-cedula"
                                          label="Cédula"
                                          isRequired={tipoCompra === "abonado"}
                                          value={cedula}
                                          onChange={(e) => handleCedulaClient(e)}
                                        />

                                        <Input
                                          disabled={clientNameDisabled}
                                          id="client-name"
                                          label="Nombre"
                                          isRequired={tipoCompra === "abonado"}
                                          value={clientName}
                                          onChange={(e) => handleNameClient(e)}
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
                                          value={metodoPago}
                                          onChange={(e) => setMetodoPago(e.target.value)}
                                        >
                                          <SelectItem key="contado">Contado</SelectItem>
                                          <SelectItem key="otro">Otro</SelectItem>
                                        </Select>

                                        {metodoPago === "contado" && (
                                          <Select
                                            id="metodo-pago-contado"
                                            isRequired={tipoCompra === "abonado"}
                                            label="Método de pago"
                                            placeholder="Seleccione el método de pago"
                                            value={metodoPago}
                                            onChange={(e) => setTipoPago(e.target.value)}
                                          >
                                            <SelectItem key={1}>Efectivo</SelectItem>
                                            <SelectItem key={2}>Transferencia</SelectItem>
                                          </Select>
                                        )}

                                        {metodoPago === "otro" && (
                                          <Select
                                            id="metodo-pago-credito"
                                            isRequired={tipoCompra === "abonado"}
                                            label="Método de pago"
                                            placeholder="Seleccione el método de pago"
                                            value={metodoPago}
                                            onChange={(e) => setTipoPago(e.target.value)}
                                          >
                                            <SelectItem key={3}>Tarjeta crédito/débito</SelectItem>
                                            <SelectItem key={4}>Convenio instituciones</SelectItem>
                                          </Select>
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
                                                  asientos: groupSelected.join(", "),
                                                  sitioVenta: nombreSitio,
                                                  pago: tipoPago,
                                                  plazo: plazo,
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
                                        <div className="flex gap-1">
                                          <Checkbox
                                            color="primary"
                                            checked={plazo === "1"}
                                            onChange={() => setPlazo("1")}
                                            isSelected={aceptTerminos}
                                            onValueChange={setAceptTerminos}
                                          >
                                          </Checkbox>
                                          <span className="text-small font-semibold">
                                            Acepto los{" "}
                                            <a
                                              href="/terminos-condiciones"
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-500 hover:underline"
                                            >
                                              términos y condiciones
                                            </a>
                                          </span>
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
                                            {isSubmitting ? <Spinner /> : tipoPago === "3" ? "Siguiente" : "Finalizar"}
                                          </Button>
                                        </ModalFooter>
                                      </form>
                                    </>
                                  ) : (
                                    <CreditCard
                                      onClose={() => {
                                        onClose;
                                        setShowCreditCard(false)
                                      }}
                                      dataCreditCard={dataCreditCard}
                                      onUpdateCreditCard={(updatedData) => {
                                        setDataCreditCard(updatedData);
                                        const customEvent = { preventDefault: () => { } } as React.FormEvent<HTMLFormElement>;
                                        handlePostAsientos(customEvent);
                                      }}
                                    />
                                  )}
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
