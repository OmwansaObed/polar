import db from "@/lib/database/Db.js";
import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("🟢 Received MPESA callback request");

  try {
    const body = await request.json();
    const callback = body?.Body?.stkCallback;

    if (!callback) {
      return NextResponse.json(
        {
          ResultCode: 1,
          ResultDesc: "Invalid Data",
        },
        { status: 400 }
      );
    }

    const { CheckoutRequestID, ResultCode } = callback;
    const status = ResultCode === 0 ? "success" : "failed";

    const result = await db.query(
      `UPDATE payments 
       SET status = ? 
       WHERE mpesa_checkout_request_id = ?`,
      [status, CheckoutRequestID]
    );

    if (result.affectedRows === 0) {
      console.warn(
        `⚠️ No payment record found for CheckoutRequestID: ${CheckoutRequestID}`
      );
    } else {
      console.log(
        `✅ Updated status to '${status}' for CheckoutRequestID: ${CheckoutRequestID}`
      );
    }

    return NextResponse.json(
      {
        ResultCode: 0,
        ResultDesc: "Success",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Callback Error:", error);
    return NextResponse.json(
      {
        ResultCode: 1,
        ResultDesc: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
