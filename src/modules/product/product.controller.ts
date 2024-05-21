import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { CustomError } from "../order/order.interface";
import { productSchemaZodValidation } from "../../zod.validation";

// product create
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const zodParseData = productSchemaZodValidation.parse(product);
    const result = await ProductServices.createProductIntoDB(zodParseData);
    //send response
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

//get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await ProductServices.getAllProductsIntoDB(searchTerm);
    if (searchTerm) {
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
      });
    }
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

// get single product into db
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductIntoDB(productId);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

// update single product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const { productId } = req.params;
    const result = await ProductServices.updateSingleProductIntoDB(
      productId,
      product
    );

    res.status(200).json({
      success: true,
      message: "Products updated successfully!",
      data: result,
    });
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

//deleted single product
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteSingleProductIntoDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (err) {
    const error = err as CustomError;
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
