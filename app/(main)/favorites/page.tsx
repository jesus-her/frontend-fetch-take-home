"use client";

import { useEffect } from "react";
import { DogsList } from "@/components/dogs-list";
import { useDogsStore } from "@/store/dogs-store";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { BsSearchHeartFill } from "react-icons/bs";

export default function FavoritesPage() {
  const fetchLikedDogs = useDogsStore((state) => state.fetchLikedDogs);
  const likedDogs = useDogsStore((state) => state.likedDogs);
  const myLikedDogs = useDogsStore((state) => state.myLikedDogs);
  const loading = useDogsStore((state) => state.loading);
  const handleMatch = useDogsStore((state) => state.handleMatch);

  const router = useRouter();

  useEffect(() => {
    fetchLikedDogs();
  }, [likedDogs]);

  return (
    <section className=" relative">
      {myLikedDogs.length > 0 ? (
        <>
          <h1 className=" lg:text-5xl text-3xl font-semibold text-left w-full mt-4 mb-8">
            My favorites{" "}
            <span className=" lg:text-3xl text-2xl">{`(${myLikedDogs.length})`}</span>
          </h1>
          <DogsList dogs={myLikedDogs} />
          <Button
            isLoading={loading}
            onClick={handleMatch}
            color="warning"
            variant="shadow"
            size="lg"
            className=" fixed bottom-8 z-[11] mx-auto left-0 right-0 w-fit font-medium text-lg"
          >
            Match!
          </Button>
        </>
      ) : (
        <div className="w-full h-[70vh]  flex flex-col items-center justify-center gap-4 py-12 px-4">
          <h2 className=" text-2xl font-semibold text-center">
            No Dogs added to favorites yet.
          </h2>
          <BsSearchHeartFill className=" text-5xl" />
          <Button
            color="warning"
            variant="shadow"
            onClick={() => router.push("/")}
            className=" font-semibold capitalize"
          >
            Discover your next best friend!
          </Button>
        </div>
      )}
    </section>
  );
}
