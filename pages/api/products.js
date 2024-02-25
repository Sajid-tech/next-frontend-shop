import { NextResponse } from "next/server";
import mongooseConnect from "@/lib/mongoose";
import Product from "@/models/Product";

export default async function GET(req, res) {



    await mongooseConnect()
    const product = await Product.find()
    return res.json({ product })

}