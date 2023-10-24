"use client";

import React, { useEffect } from "react";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { useAuthStore } from "@/store/auth-store";

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
    <div className="flex flex-col  w-full ">
      <Card className="max-w-full self-center w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <form className="flex flex-col justify-between text-center h-full">
            <h2 className=" text-3xl font-bold">Login</h2>
            <div className=" flex flex-col gap-4">
              <Input
                isRequired
                label="Name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                isRequired
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                isLoading={loading}
                isDisabled={name && email ? false : true || loading}
                fullWidth
                color="primary"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
