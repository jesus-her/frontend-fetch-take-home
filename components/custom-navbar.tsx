"use client";

import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  DropdownSection,
  Image,
} from "@nextui-org/react";
import ThemeSwitch from "./theme-switch";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import Logo from "@/components/fetch-logo";
import { useDogsStore } from "@/store/dogs-store";

export default function CustomNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const myLikedDogs = useDogsStore((state) => state.myLikedDogs);

  const name = useAuthStore((state) => state.name);
  const email = useAuthStore((state) => state.email);
  const handleLogout = useAuthStore((state) => state.handleLogout);

  return (
    <Navbar
      className=" fixed top-0 left-0 border-b-1 border-gray-200 dark:border-[#2c2c2c]"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-secondary",
        ],
      }}
    >
      <NavbarContent justify="start">
        {/* Logo */}
        <NavbarBrand className="mr-4" onClick={() => router.push("/")}>
          <Logo />
        </NavbarBrand>
        <NavbarContent as="div" className=" gap-4 items-center">
          <NavbarItem isActive={pathname === "/"}>
            <Link
              className=" cursor-pointer"
              color={pathname === "/" ? "secondary" : "foreground"}
              onClick={() => router.push("/")}
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname === "/favorites"}>
            <Link
              className=" cursor-pointer relative"
              onClick={() => router.push("/favorites")}
              aria-current="page"
              color={pathname === "/favorites" ? "secondary" : "foreground"}
            >
              {/* <div className=" bg-[#F5A524] absolute -top-2 -right-4 w-4 h-4 flex items-center justify-center rounded-full">
                <p className=" text-sm text-black font-semibold">
                  {myLikedDogs.length}
                </p>
              </div> */}
              Favorites
            </Link>
          </NavbarItem>
          <NavbarItem className=" ml-3 lg:ml-6">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  alt="avatar"
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={name}
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026724d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownSection showDivider>
                  <DropdownItem key="name" isReadOnly>
                    <p className=" text-xl  font-bold capitalize">{name}</p>
                  </DropdownItem>
                  <DropdownItem key="profile">
                    <p className="font-semibold opacity-80">Signed in as</p>
                    <p className="font-semibold opacity-80">{email}</p>
                  </DropdownItem>
                </DropdownSection>

                <DropdownSection showDivider>
                  <DropdownItem
                    key="theme"
                    isReadOnly
                    endContent={<ThemeSwitch />}
                  >
                    Theme
                  </DropdownItem>
                </DropdownSection>

                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
}
