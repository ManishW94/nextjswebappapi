import prisma from "@/app/libs/prismadb";
import * as bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { ulid } from "ulid";

type Role = "ADMIN" | "USER";

interface RequestBody {
  name: string;
  role: Role | undefined;
  avatar: string;
  username: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { username: body.username },
  });

  if (existingUser) {
    return NextResponse.json({ message: "User already exists", status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      id: ulid(),
      name: body.name,
      role: body.role as Role,
      avatar: body.avatar,
      username: body.username,
      password: await bcrypt.hash(body.password, 10),
    },
  });

  const { password, ...result } = user;
  return NextResponse.json({
    message: "User got registered successfully",
    status: 200,
    result,
  });
}
