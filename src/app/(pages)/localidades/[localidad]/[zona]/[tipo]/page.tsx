/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
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
  cn,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFGenerate from "@/components/PDF";
import { Toaster, toast } from "sonner";
import { maxColsValues, useNombreSitio } from "./utils";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";
import { DownloadIcon } from "@/components/DownloadIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { LocalidadesPageProps } from "@/types/localidad";
import { getAsientos, postAsientos, postPayment } from "@/lib/actions/asientos.actions";
import { getVendidosLocalidad } from "@/lib/actions/total-vendidos.actions";
import CreditCard from "@/components/CreditCard";
import { encryptCardData } from "@/lib/utils";
import { Tarjeta } from "@/types/pago";
import { obtenerPrecioPorTipo } from "@/types/precio.asientos";

export default function Asientos({ params }: LocalidadesPageProps) {
  const [asientos, setAsientos] = useState<any[]>([]);
  const [groupSelected, setGroupSelected] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [cedula, setCedula] = useState("");
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tipoCompra, setTipoCompra] = useState("abonado");
  const [tipoPago, setTipoPago] = useState("");
  const [plazo, setPlazo] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cedulaDisabled, setCedulaDisabled] = useState(false);
  const [clientNameDisabled, setClientNameDisabled] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [phoneDisabled, setPhoneDisabled] = useState(false);
  const [aceptTerminos, setAceptTerminos] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const modal2 = useDisclosure();
  const onCloseRef = useRef<() => void>(() => { });
  const nombreSitio = useNombreSitio();
  const [disponiblesLocalidad, setDisponiblesLocalidad] = useState(0);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [dataCreditCard, setDataCreditCard] = useState<Tarjeta>({
    numero: "",
    nombreTitular: "",
    cvv: "",
    fechaVencimiento: "",
  });

  useEffect(() => {
    fetchAsientos();
    fetchVendidosLocalidad();
  }, []);

  const fetchAsientos = async () => {
    const fetchedAsientos = await getAsientos(params);
    console.log(fetchedAsientos, "fech asientos");
    setAsientos(fetchedAsientos);
  };

  const fetchVendidosLocalidad = async () => {
    const fetchedVendidosLocalidad = await getVendidosLocalidad({ params });
    console.log(fetchedVendidosLocalidad, "fetch vendidos localidad");
    setDisponiblesLocalidad(fetchedVendidosLocalidad);
  };

  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const resetForm = () => {
    setGroupSelected([]);
    setClientName("");
    setEmail("");
    setPhone("");
    setTipoCompra("abonado");
    setMetodoPago("");
    setTipoPago("");
    setPlazo("");
    setAceptTerminos(false);
  };

  const handlePostAsientos = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!aceptTerminos) {
      toast.error("Debes aceptar los términos y condiciones para continuar.");
      return;
    }

    if (tipoPago === "3" && !showCreditCard) {
      setShowCreditCard(true);
      return
    }

    setIsSubmitting(true);

    try {

      const pricioAsiento = obtenerPrecioPorTipo(params.tipo);
      const total = groupSelected.length * pricioAsiento;

      const encryptedCardData = await encryptCardData(dataCreditCard);

      const dataPayment = {
        encryptedData: encryptedCardData,
        total: parseFloat(total.toFixed(2)),
        useCard: showCreditCard ? true : false,
        formaPago: tipoPago === "3" ? "Tarjeta crédito/débito" : metodoPago,
      }

      console.log(dataPayment, "data payment");
      const resPayment = await postPayment(dataPayment)
      console.log(resPayment, "res payment");

      const dataToSend = {
        localidad: params.localidad,
        zona: params.zona,
        tipo: params.tipo,
        comprador: {
          cedula: cedula,
          nombre: clientName,
          correo: email,
          telefono: phone,
        },
        asientosSeleccionados: groupSelected,
        tipoCompra: tipoCompra === "abonado" ? "A" : "N",
        vendedor: nombreSitio,
        idPago: resPayment.id,
      };
      console.log(dataToSend, "data to send");

      await postAsientos(dataToSend);

      onCloseRef.current();
      resetForm();
      setCedulaDisabled(false);
      setClientNameDisabled(false);
      setEmailDisabled(false);
      setPhoneDisabled(false);

      await fetchAsientos();

      toast.success("Compra realizada con éxito");
    } catch (error) {
      toast.error("Error al realizar la compra");
    } finally {
      setIsSubmitting(false);
    }
  };

  const groupByRows = (asientos: any[]) => {
    const rows = [];
    for (let i = 0; i < asientos.length; i += maxColsValue) {
      const row = asientos.slice(i, i + maxColsValue);
      rows.push(row);
    }
    return rows;
  };

  const handleSelected = (value: any) => {
    setGroupSelected(value);
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleNameClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value);
  };

  const handleCedulaClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCedula(e.target.value);
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
    setCedula(cliente.cedula);
    setClientName(cliente.nombreComprador);
    setEmail(cliente.correoComprador);
    setPhone(cliente.telefonoComprador);
    modal2.onClose();
    setCedulaDisabled(true);
    setClientNameDisabled(true);
    setEmailDisabled(true);
    setPhoneDisabled(true);
  };

  const zonaEspecial = ["A0", "B0"];
  const maxColsStyle =
    maxColsValues[`${params.localidad}_${params.zona}_${params.tipo}`].style;
  const maxColsValue =
    maxColsValues[`${params.localidad}_${params.zona}_${params.tipo}`].value;

  return (
    <>
      <main>
        <div className="mx-auto max-w-fit mb-4 px-3 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-4">
            <motion.div
              variants={fadeIn("down", 0.1)}
              initial="hidden"
              animate="show"
              exit="hidden"
              viewport={{ once: false, amount: 0.5 }}
            >
              <Card>
                <Image
                  src={`/assets/${params.localidad}-${params.zona}-${params.tipo}.svg`}
                  alt={"GuiaLocalidad"}
                  width={550}
                  height={550}
                />
              </Card>
            </motion.div>
          </div>
          <motion.div
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            animate="show"
            exit="hidden"
            viewport={{ once: false, amount: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-1 items-center justify-center gap-4 text-2xl font-bold ">
                <span className="lg:tracking-[10px]">{params.tipo} - </span>

                <span className="lg:tracking-[10px]">
                  {params.localidad === "T" ? "TRIBUNA" : "CANCHA"} -{" "}
                </span>

                <span>{params.zona}</span>
              </CardHeader>

              <Toaster richColors position="bottom-center" />
              <div className="inline-flex gap-2 text-xl justify-center">
                <h1 className="font-bold">Asientos disponibles:</h1>
                <div>
                  <span className="text-green-500">{disponiblesLocalidad}</span>{" "}
                  / <span>{asientos.length}</span>
                </div>
              </div>
              <div className="lg:inline-flex justify-between gap-2 m-5">
                <div className="inline-flex gap-2 items-center">
                  <h1 className="font-semibold">Seleccionado/s:</h1>
                  <p>{groupSelected.join(", ")}</p>
                </div>
                <div className="inline-flex items-center gap-5 ml-5">
                  {/*<div className="inline-flex items-center gap-1">*/}
                  {/*  <p>Abonados:</p>*/}
                  {/*  <div className="w-4 h-4 bg-[#d4b47e] rounded-full"></div>*/}
                  {/*</div>*/}
                  {/*<div className="inline-flex items-center gap-2">*/}
                  {/*  <p>No abonados:</p>*/}
                  {/*  <div className="w-4 h-4 bg-[#163056] rounded-full"></div>*/}
                  {/*</div>*/}
                  <div className="inline-flex items-center gap-2">
                    <p>Disponibles:</p>
                    <div className="w-4 h-4 bg-content3 rounded-full"></div>
                  </div>
                </div>
              </div>

              <Divider />
              {/* {isLoading ? (
                <Spinner />
              ) : ( */}
              <CardBody>
                {groupByRows(asientos).map((row, index) => {
                  let isRtl = index % 2 === 1;
                  if (
                    zonaEspecial.includes(params.zona) ||
                    (params.tipo === "SILLAS" &&
                      params.localidad === "T" &&
                      ["A1", "B2"].includes(params.zona)) ||
                    (params.tipo === "BUTACAS" &&
                      params.localidad === "T" &&
                      ["B1", "B2"].includes(params.zona)) ||
                    (params.tipo === "GRADAS" &&
                      params.localidad === "T" &&
                      ["B1", "B2"].includes(params.zona))
                  ) {
                    isRtl = !isRtl;
                  }
                  return (
                    <div
                      key={index}
                      className={`grid ${maxColsStyle} text-center overflow-x-auto lg:gap-0 sm:gap-12 gap-12`}
                      dir={isRtl ? "rtl" : "ltr"}
                    >
                      {row.map((asiento: any, index: any) => (
                        <CheckboxGroup
                          key={index}
                          value={groupSelected}
                          onChange={handleSelected}
                          isDisabled={
                            (!isSwitchOn && asiento.estado === "N") ||
                            (isSwitchOn && asiento.estado === "D")
                          }
                        >
                          <Checkbox
                            value={asiento.numero}
                            color="primary"
                            classNames={{
                              base: cn(
                                "flex flex-col w-10 h-fit bg-content1 m-1",
                                "hover:bg-content3",
                                "cursor-pointer rounded-lg border-2 border-transparent",
                                asiento.estado === "N"
                                  ? "bg-[#163056]"
                                  : "bg-content2",
                                "data-[selected=true]:bg-green-500",
                                isSwitchOn &&
                                asiento.estado === "D" &&
                                "bg-gray-300"
                              ),
                            }}
                          >
                            <p
                              className={
                                asiento.estado === "N"
                                  ? "text-white font-bold"
                                  : ""
                              }
                            >
                              {asiento.numero}
                            </p>
                          </Checkbox>
                        </CheckboxGroup>
                      ))}
                    </div>
                  );
                })}
              </CardBody>

              <Divider />
              <CardFooter className="flex flex-col gap-4 justify-center">
                <div className="flex w-full flex-1 gap-4 ">
                  <Link className="w-full" href="/localidades">
                    <Button className="w-full bg-red-500 text-white font-semibold">
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
                </div>
              </CardFooter>
            </Card>
          </motion.div>

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
                            <p className="font-light">{groupSelected.join("-")}</p>
                          </div>
                          <div className="inline-flex gap-2 items-center">
                            <p className="font-semibold text-lg">Precio:</p>
                            <p className="font-light">
                              {groupSelected.length * obtenerPrecioPorTipo(params.tipo)}
                            </p>
                          </div>
                          <Button
                            startContent={<SearchIcon />}
                            size="sm"
                            onPress={modal2.onOpen}
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
                                      localidad: params.localidad,
                                      zona: params.zona,
                                      tipo: params.tipo,
                                    }}
                                  />
                                }
                                fileName="comprobante.pdf"
                              >
                                <>
                                  {loading ? (
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
          <Toaster richColors position="bottom-center" />
        </div>
      </main>
    </>
  );
}
