import { connectToDB } from "@/app/lib/dbconnect";
import { Products } from "@/app/lib/Models/productSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
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
