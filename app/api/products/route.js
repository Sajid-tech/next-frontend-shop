import { NextResponse } from "next/server";
import mongooseConnect from "@/lib/mongoose";
import Product from "@/models/Product";

export const GET = async (req) => {


    try {
        await mongooseConnect()
        const product = await Product.find()
        return NextResponse.json({ product })
    } catch (error) {
        return new NextResponse("err in fetching products" + error, { status: 500 })
    }
}