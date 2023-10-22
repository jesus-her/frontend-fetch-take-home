"use client";
import React from "react";
import { Tabs, Tab, Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { BsHeartFill, BsHouseFill } from "react-icons/bs";

import { useDogsStore } from "@/store/dogs-store";

export default function BottomTabs() {
  const router = useRouter();
  const handleMatch = useDogsStore((state) => state.handleMatch);
  const likedDogs = useDogsStore((state) => state.likedDogs);

  return (
    <div className="flex w-full items-center justify-center fixed bottom-3 left-0 z-50">
      <Card className="max-w-full rounded-full">
        <CardBody className="overflow-hidden p-2 py-2 items-center gap-2">
          <Tabs
            disabledKeys={likedDogs.length < 3 ? ["match"] : [""]}
            aria-label="Options"
            color="primary"
            variant="bordered"
            radius="full"
          >
            <Tab
              key="home"
              title={
                <div
                  onClick={() => router.push("/")}
                  className="flex items-center space-x-2"
                >
                  <BsHouseFill />
                  <span>Home</span>
                </div>
              }
            />

            {/* <Tab
              key="match"
              disabled={likedDogs.length < 3 ? true : false}
              title={
                <Button
                  onClick={handleMatch}
                  color="warning"
                  variant="shadow"
                  className="rounded-full "
                >
                  Match!
                </Button>
              }
            /> */}

            <Tab
              key="favorites"
              title={
                <div
                  onClick={() => router.push("/favorites")}
                  className="flex items-center space-x-2"
                >
                  <BsHeartFill />
                  <span>Favorites</span>
                </div>
              }
            />
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
