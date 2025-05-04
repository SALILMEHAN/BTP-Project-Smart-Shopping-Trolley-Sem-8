import { connectToDB } from "@/app/lib/dbconnect";
import { Products } from "@/app/lib/Models/productSchema";
import { NextResponse } from "next/server";
import { productPrices, productImg } from "@/app/utils";

const Token = process.env.TOKEN;

export async function POST(req) {
  const { item, token } = await req.json();
  try {
    if (token != Token) {
      return NextResponse.json({
        message: "Unauthorized Token",
        success: false,
      });
    }
    await connectToDB();
    const Product = await Products.find({ title: item });
    if (Product.length == 0) {
      const productPrice = productPrices[item];
      const productImage = productImg[item];
      const newProduct = new Products({
        title: item,
        price: productPrice,
        stock: 1,
        imageUrl: productImage,
      });
      await newProduct.save();
    } else {
      await Products.findOneAndUpdate(
        { title: item },
        { stock: Product[0].stock + 1 }
      );
    }
    return NextResponse.json({
      message: "Product Added",
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
