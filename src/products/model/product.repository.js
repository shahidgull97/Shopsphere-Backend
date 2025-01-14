import ProductModel from "./product.schema.js";

export const addNewProductRepo = async (product, useID, userName) => {
  return await new ProductModel(product).save();
};

export const getAllProductsRepo = async () => {
  // return await ProductModel.find(filters).skip(skip).limit(itemsPerPage);
  return await ProductModel.find({});
};

export const updateProductRepo = async (_id, updatedData) => {
  return await ProductModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
};

export const deleProductRepo = async (_id) => {
  return await ProductModel.findByIdAndDelete(_id);
};

export const getProductDetailsRepo = async (_id) => {
  return await ProductModel.findById(_id);
};

export const getTotalCountsOfProduct = async () => {
  return await ProductModel.countDocuments();
};

// To get a specific product
export const findProductRepo = async (productId) => {
  return await ProductModel.findById(productId);
};
