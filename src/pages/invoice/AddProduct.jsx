/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { CgCloseO } from "react-icons/cg";
import { toast } from "react-hot-toast";
import { input_filed_style } from "../../utils/someClasses";
import { useDispatch } from "react-redux";
import { addToInvoice } from "../../redux/feature/invoice/invoiceSlice";
import { useState } from "react";
import ProductListDropdown from "./ProductListDropdown";
import { usePostProductMutation } from "../../redux/feature/products/productApi";

const AddProduct = ({ isModalOpen, closeModal }) => {

  const [postProduct] = usePostProductMutation();
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data, event) => {
    event.preventDefault();
    const clearForm = event.target;
    dispatch(addToInvoice(data));

    const productData = {};



    postProduct(productData);
    console.log(data);
    clearForm.reset();
    toast.success("Added Buyer");
  };




  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[30%] transform duration-300 z-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-8 rounded max-w-4xl mx-auto dark:bg-gray-800 border drop-shadow-lg relative"
          >
            <div
              onClick={closeModal}
              className="text-2xl text-slate-500 hover:text-red-600 absolute right-4 top-4"
            >
              <CgCloseO />
            </div>

            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white text-center">
              Add Product
            </h2>

            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-700 dark:text-gray-200 flex">
                  Product Name: <ProductListDropdown selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
                </label>
                <input
                defaultValue={selectedItem?.product_name}
                  {...register("product_name", { required: true })}
                  type="text"
                  className={input_filed_style}
                />
                {errors.product_name && (
                  <span className="text-sm text-red-300">
                    This field is required !
                  </span>
                )}
              </div>





              <div>
                <label className="text-gray-700 dark:text-gray-200">
                  Product Price
                </label>
                <input
                defaultValue={selectedItem?.buying_price}
                  {...register("buying_price", { required: true })}
                  type="text"
                  className={input_filed_style}
                />
                {errors.buying_price && (
                  <span className="text-sm text-red-300">
                    This field is required !
                  </span>
                )}
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200">
                  Quantity
                </label>
                <input
                defaultValue={selectedItem?.stock}
                  {...register("stock", { required: true })}
                  type="text"
                  className={input_filed_style}
                />
                {errors.stock && (
                  <span className="text-sm text-red-300">
                    This field is required !
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6 z-0">
              <button
                type="submit"
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
