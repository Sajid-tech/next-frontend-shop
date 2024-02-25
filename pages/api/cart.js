import mongooseConnect from "@/lib/mongoose";
import Product from "@/models/Product";

export default async function handle(req, res) {
    await mongooseConnect()
    console.log("cart mongo succesfull")
    const ids = req.body.ids;

    try {
        const products = await Product.find({ _id: { $in: ids } })
        res.json(products)
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ error: "Internal servre error" })

    }
}