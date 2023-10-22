"use client";

import { useTheme } from "@/context/theme-context";
import { Switch } from "@nextui-org/react";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch
      isSelected={theme === "dark" ? true : false}
      size="lg"
      color="warning"
      startContent={<BsSun />}
      endContent={<BsMoon />}
      onClick={toggleTheme}
    ></Switch>
  );
}
