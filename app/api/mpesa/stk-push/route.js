import { NextResponse } from "next/server";
import axios from "axios";
import getAccessToken from "@/lib/mpesa";
import moment from "moment";
import db from "@/lib/database/Db";

const shortCode = process.env.MPESA_SHORTCODE;
const passKey = process.env.MPESA_PASSKEY;
const callbackUrl = process.env.MPESA_CALLBACK_URL;

export async function POST(request) {
  try {
    const { phone, amount, bookingDetails } = await request.json();

    if (!shortCode || !passKey || !callbackUrl) {
      return NextResponse.json(
        { error: "Server config error" },
        { status: 500 }
      );
    }

    if (!phone || !amount || !bookingDetails) {
      return NextResponse.json({ error: "Missing input" }, { status: 400 });
    }

    // Format phone
    let formattedPhone = phone;
    if (phone.startsWith("0")) {
      formattedPhone = "254" + phone.substring(1);
    } else if (phone.startsWith("+254")) {
      formattedPhone = phone.substring(1);
    } else if (!phone.startsWith("254")) {
      formattedPhone = "254" + phone;
    }

    // 1️⃣ Save Booking to DB
    const [bookingResult] = await db.execute(
      `INSERT INTO booking (sessionType, date, time, participants, customerName, customerPhone, customerEmail, addOns, totalAmount)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        bookingDetails.sessionType,
        bookingDetails.date,
        bookingDetails.time,
        bookingDetails.participants,
        bookingDetails.customerInfo.name,
        bookingDetails.customerInfo.phone,
        bookingDetails.customerInfo.email,
        JSON.stringify(bookingDetails.addOns),
        bookingDetails.total,
      ]
    );

    const bookingId = bookingResult.insertId;

    // 2️⃣ Prepare STK Push
    const token = await getAccessToken();
    const timeStamp = moment().format("YYYYMMDDHHmmss");
    const password = Buffer.from(`${shortCode}${passKey}${timeStamp}`).toString(
      "base64"
    );

    const payload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timeStamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: parseInt(amount),
      PartyA: formattedPhone,
      PartyB: shortCode,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: "PolarSkating",
      TransactionDesc: "Payment for skating session",
    };

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { CheckoutRequestID } = response.data;

    // 3️⃣ Save Payment (Pending)
    await db.execute(
      `INSERT INTO payment (bookingId, phone, amount, status, mpesaCheckoutRequestId)
       VALUES (?, ?, ?, 'pending', ?)`,
      [bookingId, formattedPhone, amount, CheckoutRequestID]
    );

    return NextResponse.json({
      message: "Payment initiated",
      data: response.data,
    });
  } catch (error) {
    console.error("Error:", error);
    if (error.response) {
      return NextResponse.json(
        { error: "M-Pesa Error", details: error.response.data },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
