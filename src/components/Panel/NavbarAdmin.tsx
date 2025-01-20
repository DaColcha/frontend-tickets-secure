"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@nextui-org/react";
import { useNombreSitio } from "@/app/(pages)/localidades/[localidad]/[zona]/[tipo]/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { deleteCookie } from "@/app/actions";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const nombreSitio = useNombreSitio();

  const handleLogout = () => {
    deleteCookie();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const pathname = usePathname();

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-[#163056] text-white border-b-4 border-[#d4b47e]"
    >
      <NavbarContent>
        <NavbarBrand className="inline-flex items-center justify-start  gap-4">
          <Image
            src="/assets/logoLeones_2.png"
            alt="logoLeones"
            width={80}
            height={80}
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarItem>
          <Button
          variant="flat"
            as={Link}
            href="/panel"
            className={
              pathname === "/panel"
                ? "bg-[#d4b47e] text-[#163056] font-semibold"
                : "bg-[#0c192d] text-white font-semibold"
            }
          >
            Panel
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
          variant="flat"
            as={Link}
            href="/panel/reporte"
            className={
              pathname === "/panel/reporte"
                ? "bg-[#d4b47e] text-[#163056] font-semibold"
                : "bg-[#0c192d] text-white font-semibold"
            }
          >
            Reportes
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <div className="hidden sm:flex sm:flex-col text-inherit text-xs">
          <NavbarItem className="font-bold ">
            Punto de venta
          </NavbarItem>
          <span>
            {nombreSitio || (
              <Modal backdrop="blur" size="sm" isOpen>
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
          </span>
        </div>
        <NavbarItem>
          <Button
            onClick={handleLogout}
            className="bg-[#9c0f2f] text-white font-semibold"
          >
            Salir
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="/panel/reportes">Reporte</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
