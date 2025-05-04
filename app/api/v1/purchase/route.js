import { connectToDB } from "@/app/lib/dbconnect";
import { Products } from "@/app/lib/Models/productSchema";
import { NextResponse } from "next/server";

const Token = process.env.TOKEN;

export async function DELETE(req) {
  const { token } = await req.json();
  try {
    if (token != Token) {
      return NextResponse.json({
        message: "Unauthorized Token",
        success: false,
      });
    }
    await connectToDB();
    const products = await Products.deleteMany();
    return NextResponse.json({
      body: "Product Purchased",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error,
      success: false,
    });
  }
}
