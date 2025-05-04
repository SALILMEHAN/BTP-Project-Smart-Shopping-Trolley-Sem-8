// app/api/proxy/route.js
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const res = await fetch(
      "https://btp-project-smart-shopping-trolley-sem-8.vercel.app/api/v1/purchase",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: process.env.TOKEN, // Make sure TOKEN is available in proxy too
        }),
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || "Delete failed" },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
