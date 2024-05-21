import { productModel } from "../product/product.model";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (
  email: string,
  productId: string,
  price: number,
  quantity: number
) => {
  // Fetch the product to check inventory
  const findProduct = await productModel.findById(productId);

  if (!findProduct) {
    throw new Error("Product not found");
  }

  if (findProduct.inventory.quantity < quantity) {
    throw new Error("Insufficient quantity available in inventory");
  }

  // Create the order
  const createOrder = new OrderModel({ email, productId, price, quantity });
  await createOrder.save();

  // Update the product inventory
  findProduct.inventory.quantity -= quantity;
  findProduct.inventory.inStock = findProduct.inventory.quantity > 0;
  await findProduct.save();

  return createOrder;
};

// get all orders
const getAllOrdersIntoDB = async (orderMail: string) => {
  if (orderMail) {
    const findOrderWithMail = await OrderModel.find({ email: orderMail });
    return findOrderWithMail;
  }
  const result = await OrderModel.find();
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersIntoDB,
};
