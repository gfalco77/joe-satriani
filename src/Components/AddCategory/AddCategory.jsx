import React, {useState} from 'react'
import './AddCategory.css'
import {useForm} from "react-hook-form";
import upload_area from '../../assets/upload_area.svg'
import {createCategory, uploadMedia} from "../../services/productService.js";

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
    try {
      await Promise.all([
        uploadMedia(image),
        createCategory(data, image.name)
      ]);
      // Handle responses as needed
      setSuccessMsg("Category has been saved.");
      reset();
    } catch (error) {
      setServerErrorMsg(error.message);
    }
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
            <p>Category Name</p>
            <input type="text" {...register("name", {required: "Category Name is required."})}/>
            {errors.name && (<p className="error-message">{errors.name.message}</p>)}
          </div>
          <div className='add-category-itemfield'>
            <p>Category Description</p>
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
