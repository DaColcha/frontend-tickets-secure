"use client";

import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import Image from "next/image";
import Link from "next/link";
import { useNombreSitio } from "@/app/(pages)/localidades/[localidad]/[zona]/[tipo]/utils";

export default function NavbarWrapper() {
  const nombreSitio = useNombreSitio();

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Navbar className="bg-[#163056] text-white border-b-4 border-[#d4b47e] ">
      <NavbarBrand className="inline-flex items-center justify-start  gap-4">
        <Image
          src="/assets/logoLeones_2.png"
          alt="logoLeones"
          width={80}
          height={80}
        />
        <Image
          src="/assets/logoLeones.png"
          alt="logoLeones"
          width={80}
          height={80}
        />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem className="font-bold text-inherit">
          Punto de venta:
        </NavbarItem>
        <NavbarItem className="font-bold text-inherit">
          {nombreSitio || (
            <Modal hideCloseButton backdrop="blur" size="sm" isOpen>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 text-center text-red-500">
                      Alerta
                    </ModalHeader>
                    <ModalBody className="flex flex-col text-center">
                      <p className="font-semibold">
                        Punto de venta no reconocido
                      </p>
                      <p>Vuelva iniciar sesión</p>
                    </ModalBody>
                    <ModalFooter className="flex flex-1 justify-center">
                      <Link href="/login">
                        <Button
                          className="w-full bg-[#163056] text-white font-semibold"
                          color="primary"
                          onPress={onClose}
                        >
                          Iniciar sesión
                        </Button>
                      </Link>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="flex gap-4" justify="end">
        <NavbarItem>
          <Button
            onClick={handleLogout}
            className="bg-[#9c0f2f] text-white font-semibold"
          >
            Salir
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
