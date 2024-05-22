import { z } from "zod";

export const productSchemaZodValidation = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string().min(1, "Tag must be a non-empty string")),
  variants: z.array(
    z.object({
      type: z.string().min(1, "Variant type is required"),
      value: z.string().min(1, "Variant value is required"),
    })
  ),
  inventory: z.object({
    quantity: z.number().min(0, "Quantity must be a positive number"),
    inStock: z.boolean(),
  }),
});

export const orderSchemaZodValidation = z.object({
  email: z.string().email("Invalid email address"),
  productId: z.string().min(1, "Product ID is required"),
  price: z.number().min(0, "Price must be a positive number"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export const getAllOrdersSchemaValidate = z.object({
  email: z.string().email("Invalid email address").optional(),
});
