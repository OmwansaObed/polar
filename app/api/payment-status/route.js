import db from "@/lib/database/Db";
import { NextResponse } from "next/server";

export async function GET(request) {
  // For query parameters in App Router
  const { searchParams } = new URL(request.url);
  const checkoutRequestId = searchParams.get("checkoutRequestId");

  if (!checkoutRequestId) {
    return NextResponse.json(
      { error: "CheckoutRequestID is required" },
      { status: 400 }
    );
  }

  try {
    const [rows] = await db.query(
      "SELECT status FROM payment WHERE mpesaCheckoutRequestId = ?",
      [checkoutRequestId]
    );

    const payment = rows[0];

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json(payment);
  } catch (error) {
    console.error("❌ Error in payment status route:", error);
    return NextResponse.json(
      { error: "Failed to retrieve payment status" },
      { status: 500 }
    );
  }
}
