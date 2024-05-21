import exp from "constants";
import { TProduct } from "./product.interface";
import { productModel } from "./product.model";

// product create
const createProductIntoDB = async (productData: TProduct) => {
  const result = await productModel.create(productData);
  return result;
};

//get all products
const getAllProductsIntoDB = async () => {
  const result = await productModel.find();
  return result;
};

// get single product
const getSingleProductIntoDB = async (id: string) => {
  const result = await productModel.findById(id);
  return result;
};

// update product int db
const updateSingleProductIntoDB = async (
  id: string,
  productData: Partial<TProduct>
) => {
  const result = await productModel.findByIdAndUpdate(id, productData);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsIntoDB,
  getSingleProductIntoDB,
  updateSingleProductIntoDB,
};
