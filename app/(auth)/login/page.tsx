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

  const isNameValid = name.length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  // const validateEmail = (value: string) =>
  //   value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isEmailInvalid = React.useMemo(() => {
    if (email === "") return true;

    return isEmailValid ? false : true;
  }, [email]);

  useEffect(() => {
    setEmail("");
    setName("");
  }, []);

  return (
    <section className="flex flex-col">
      <Card className="max-w-full self-center w-[340px] h-[28rem]">
        <CardHeader className=" flex flex-col gap-2">
          <p className=" font-bold text-inherit text-sm">FETCH TAKE-HOME</p>
          <Logo />
        </CardHeader>
        <CardBody className="overflow-hidden ">
          <h2 className=" text-3xl font-bold mb-4">Login</h2>
          <form
            onSubmit={handleLogin}
            className="flex flex-col h-full justify-between"
          >
            <div className=" flex flex-col gap-4">
              <Input
                maxLength={22}
                isRequired
                variant="bordered"
                label="Name"
                placeholder="Enter your name"
                value={name}
                color={!isNameValid ? "danger" : "success"}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!isNameValid}
                errorMessage={
                  !isNameValid && "Name must be at least 3 characters length"
                }
              />
              <Input
                variant="bordered"
                maxLength={36}
                color={isEmailInvalid ? "danger" : "success"}
                isRequired
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={isEmailInvalid}
                errorMessage={isEmailInvalid && "Please enter a valid email"}
              />
            </div>
            <Button
              type="submit"
              isLoading={loading}
              isDisabled={!isNameValid || isEmailInvalid || loading}
              fullWidth
              color="secondary"
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>
        </CardBody>
        {/* <CardFooter></CardFooter> */}
      </Card>
    </section>
  );
}
