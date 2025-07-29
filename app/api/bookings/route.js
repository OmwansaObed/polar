import db from "@/lib/database/Db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
  console.log("🟢Fetching bookings...");
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      {
        error: "Please Login to view your bookings",
      },
      { status: 401 }
    );
  }

  const searchParams = new URL(request.url).searchParams;
  const email = searchParams.get("email") || session?.user.email;

  if (!email) {
    return NextResponse.json(
      { error: "Please Login to continue" },
      { status: 400 }
    );
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: { customerEmail: email },
      orderBy: { date: "desc" },
      include: {
        payments: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            status: true,
          },
        },
      },
    });
    if (!bookings || bookings.length === 0) {
      return NextResponse.json(
        { message: "No bookings found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
