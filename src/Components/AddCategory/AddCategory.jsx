import React, {useState} from 'react'
import './AddCategory.css'
import {useForm} from "react-hook-form";
import upload_area from '../../assets/upload_area.svg'
import axios from 'axios';

const AddCategory = () => {
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
      <div className='add-category'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {successMsg && <p className="success-message">{successMsg}</p>}
          <div className='add-category-itemfield'>
            <p>Product Name</p>
            <input type="text" {...register("name", {required: "Category Name is required."})}/>
            {errors.name && (<p className="error-message">{errors.name.message}</p>)}
          </div>
          <div className='add-category-itemfield'>
            <p>Product Description</p>
            <input type="text" {...register("description", {required: "Category Description is required."})}/>
            {errors.description && (<p className="error-message">{errors.description.message}</p>)}
          </div>
          <div className='add-category-itemfield'>
            <label htmlFor="file-input">
              <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='add-category-img'/>
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
          </div>
          <button className='add-category-btn' type="submit">ADD</button>
          {serverErrorMsg && <p className="error-message">{serverErrorMsg}</p>}
        </form>
      </div>
  )
}
export default AddCategory
