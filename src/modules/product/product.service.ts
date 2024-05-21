import { TProduct } from "./product.interface";
import { productModel } from "./product.model";

// product create
const createProductIntoDB = async (productData: TProduct) => {
  const result = await productModel.create(productData);
  return result;
};

//get all products
const getAllProductsIntoDB = async (searchTerm: string) => {
  if (searchTerm) {
    const result = await productModel.find({ $text: { $search: searchTerm } });
    return result;
  }
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

// deleted product
const deleteSingleProductIntoDB = async (id: string) => {
  const result = await productModel.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsIntoDB,
  getSingleProductIntoDB,
  updateSingleProductIntoDB,
  deleteSingleProductIntoDB,
};
