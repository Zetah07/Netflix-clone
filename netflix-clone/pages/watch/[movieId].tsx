import React from "react";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

import useMovie from "@/hooks/useMovie";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);
  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          size={40}
          className="text-white cursor-pointer"
          onClick={() => router.push('/')}
        />
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light">Watching: </span>
          {data?.title}
        </p>
      </nav>
      <video autoPlay controls className="w-full h-full" src={data?.videoUrl} />
    </div>
  );
};

export default Watch;
