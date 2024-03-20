import React, {useEffect} from 'react'
import './ListProduct.css'
import axios from 'axios';
import remove_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [products, setProducts] = React.useState([]);

  const fetchProducts = async () => {
    await axios.get('https://am7wpm2yvf.execute-api.eu-west-2.amazonaws.com/Stage/products')
    .then(response => response.data)
    .then((data) => {
      setProducts(data)
    })
    .catch(error => {
      // Handle errors
      console.log(error);
    });
  }

  useEffect(() => {
    return () => {
      fetchProducts();
    };
  }, []);

  const removeProduct = async (id) => {
    await axios.delete('https://am7wpm2yvf.execute-api.eu-west-2.amazonaws.com/Stage/products/', {id: id})
    .then(() => {
      fetchProducts();
    })
    .catch(error => {
      // Handle errors
      console.log(error);
    });
  }

  return (
      <div className='list-product'>
        <h1>Products</h1>
        <div className='listproduct-format-main'>
          <p>Products</p>
          <p>Title</p>
          <p>Was Price</p>
          <p>Now Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className='listproduct-allproducts'>
          <hr/>
          {products.map((product) => {
            return (
                <div className='listproduct-format-main listproduct-format' key={product.PK}>
                  <img src={product.image} alt="" className='listproduct-product-img'/>
                  <p>{product.name}</p>
                  <p>£{product.was_price}</p>
                  <p>£{product.now_price}</p>
                  <p>£{product.category}</p>
                  <img onClick={() => {
                    removeProduct(product.PK)
                  }} src={remove_icon} alt="" className='listproduct-remove-icon'/>
                </div>
            )
          })}
        </div>
      </div>
  )
}
export default ListProduct
