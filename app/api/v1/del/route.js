import { connectToDB } from "@/app/lib/dbconnect";
import { Products } from "@/app/lib/Models/productSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { item } = await req.json();
  try {
    await connectToDB();
    const Product = await Products.find({ title: item });
    if (Product.length == 0) {
      return new Response("Product not found", {
        status: 200,
      });
    }
    if (Product[0].stock == 1) {
      await Products.findOneAndDelete({ title: item });
    } else {
      await Products.findOneAndUpdate(
        { title: item },
        { stock: Product[0].stock - 1 }
      );
    }
    return NextResponse.json({
      message: "Product Deleted",
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
