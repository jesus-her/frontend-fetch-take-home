"use client";

import React, { useEffect } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@nextui-org/react";
import { useAuthStore } from "@/store/auth-store";
import Logo from "@/components/fetch-logo";

export default function LoginPage() {
  const loading = useAuthStore((state) => state.loading);
  const name = useAuthStore((state) => state.name);
  const email = useAuthStore((state) => state.email);
  const setEmail = useAuthStore((state) => state.setEmail);
  const setName = useAuthStore((state) => state.setName);
  const handleLogin = useAuthStore((state) => state.handleLogin);

  useEffect(() => {
    setEmail("");
    setName("");
  }, []);

  return (
    <section className="flex flex-col">
      <Card className="max-w-full self-center w-[340px] h-[400px]">
        <CardHeader className=" flex flex-col gap-2">
          <p className=" font-bold text-inherit text-sm">FETCH TAKE-HOME</p>
          <Logo />
        </CardHeader>
        <CardBody className="overflow-hidden">
          <form className="flex flex-col justify-between text-left h-full">
            <h2 className=" text-3xl font-bold">Login</h2>

            <Input
              maxLength={22}
              isRequired
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              maxLength={36}
              isRequired
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </form>
        </CardBody>
        <CardFooter>
          <Button
            isLoading={loading}
            isDisabled={name && email ? false : true || loading}
            fullWidth
            color="secondary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
