import { verifyJwt } from "@/app/libs/jwt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const accessToken = request.headers.get("authorization");
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(
      JSON.stringify({
        error: "unauthorized",
      }),
      {
        status: 401,
      }
    );
  }
  const getUsers = await prisma.user.findMany({
    select: {
      name: true,
      role: true,
      username: true,
    },
  });

  return NextResponse.json({
    message: "All Users records got fetched successfully",
    getUsers,
  });
}
