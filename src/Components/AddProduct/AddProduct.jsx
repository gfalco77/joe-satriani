// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
import './AddProduct.css'
import {useForm} from "react-hook-form";
import upload_area from '../../assets/upload_area.svg'
import axios from 'axios';

const AddProduct = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [serverErrorMsg, setServerErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    await axios.post('https://am7wpm2yvf.execute-api.eu-west-2.amazonaws.com/Stage/products', data)
    .then(response => {
      setSuccessMsg("Product has been saved.");
      reset();
    })
    .catch(error => {
      setServerErrorMsg(error.message);
    });
  };

  const [image, setImage] = useState(false);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  return (
      <div className='add-product'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {successMsg && <p className="success-message">{successMsg}</p>}
          <div className='addproduct-itemfield'>
            <p>Product Sku</p>
            <input type="text" {...register("sku", {required: "Product sku is required."})}/>
            {errors.sku && (<p className="error-message">{errors.sku.message}</p>)}
          </div>
          <div className='addproduct-itemfield'>
            <p>Product Name</p>
            <input type="text" {...register("name", {required: "Product Name is required."})}/>
            {errors.name && (<p className="error-message">{errors.name.message}</p>)}
          </div>
          <div className='addproduct-itemfield'>
            <p>Product Description</p>
            <input type="text" {...register("description", {required: "Product Description is required."})}/>
            {errors.description && (<p className="error-message">{errors.description.message}</p>)}
          </div>
          <div className='addproduct-price'>
            <div className='addproduct-itemfield'>
              <p>Price</p>
              <input type="text" {...register("price", {required: "Product Price is required."})}/>
              {errors.price && (<p className="error-message">{errors.price.message}</p>)}
            </div>
            <div className='addproduct-itemfield'>
              <p>Now Price</p>
              <input type="text" {...register("now_price")}/>
            </div>
          </div>
          <div className='addproduct-itemfield'>
            <p>Product Category</p>
            <select name='category' className='add-product-selector' {...register("category")}>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kid">Kids</option>
            </select>
          </div>
          <div className='addproduct-itemfield'>
            <label htmlFor="file-input">
              <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='addproduct-img'/>
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
          </div>
          <button className='addproduct-btn' type="submit">ADD</button>
          {serverErrorMsg && <p className="error-message">{serverErrorMsg}</p>}
        </form>
      </div>
  )
}
export default AddProduct
