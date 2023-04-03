import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    await serverAuth(req);

    const { movieId } = req.query;

    if (typeof movieId !== "string") {
      throw new Error("Invalid movie ID");
    }

    if (!movieId) {
      throw new Error("Movie ID is required");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new Error("Movie not found");
    }

    res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
