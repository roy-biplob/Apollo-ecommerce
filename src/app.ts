import express, { Request, Response } from "express";
import cors from "cors";
import { productRoutes } from "./modules/product/product.route";
import { OrderRoutes } from "./modules/order/order.route";
const app = express();

// parser
app.use(express.json());
app.use(cors());

//application routes
app.use("/api/products", productRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Running!");
});

export default app;
