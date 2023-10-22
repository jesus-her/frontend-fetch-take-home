"use client";

import { useEffect } from "react";
import { DogsList } from "@/components/dogs-list";
import { useDogsStore } from "@/store/dogs-store";

export default function FavoritesPage() {
  const fetchLikedDogs = useDogsStore((state) => state.fetchLikedDogs);
  const likedDogs = useDogsStore((state) => state.likedDogs);
  const myLikedDogs = useDogsStore((state) => state.myLikedDogs);

  useEffect(() => {
    fetchLikedDogs();
  }, [likedDogs]);

  return (
    <section>
      {myLikedDogs.length > 0 ? (
        <DogsList dogs={myLikedDogs} />
      ) : (
        <div className=" border w-full  flex flex-col items-center justify-center py-12 px-4">
          <h2 className=" text-2xl font-semibold text-center">
            No Dogs added to favorites yet.
          </h2>
        </div>
      )}
    </section>
  );
}
