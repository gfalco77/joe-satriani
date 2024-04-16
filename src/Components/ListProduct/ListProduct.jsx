import React, {useEffect} from 'react'
import './ListProduct.css'
import axios from 'axios';
import remove_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [products, setProducts] = React.useState([]);

  const fetchProducts = async () => {
    await axios.get('https://0w8h1wwfd8.execute-api.eu-west-2.amazonaws.com/Stage/products')
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
    await axios.delete('https://0w8h1wwfd8.execute-api.eu-west-2.amazonaws.com/Stage/products/', {id: id})
    .then(() => {
      fetchProducts();
    })
    .catch(error => {
      // Handle errors
      console.log(error);
    });
  }

  // Function to find the carousel image URL for a given product
  const findCarouselImageUrl = (product) => {
    // Check if product and productImages are defined
    if (product && product.images) {
      // Find the carousel image in the productImages array
      const image = product.images.find(image => image && image.type === 'thumbnail');
      // Return the URL if carouselImage is defined, otherwise return null
      return image ? 'https://dh3ia0klkutsh.cloudfront.net/' + image.url : null;
    }
    return null; // Return null if product or productImages are undefined
  };

  return (
      <div className='list-product'>
        <h1>Products</h1>
        <div className='listproduct-format-main'>
          <p><b>Image</b></p>
          <p><b>Name</b></p>
          <p><b>Price</b></p>
          <p><b>Category</b></p>
          <p><b>Remove</b></p>
        </div>
        <hr/>
        {products.map((product) => {
          return (
              <div className='listproduct-format-main listproduct-format' key={product.PK}>
                <img src={findCarouselImageUrl(product)} alt="Carousel" className='listproduct-product-img'/>
                {/*<img src={carouselImageUrl} alt="" className='listproduct-product-img'/>*/}
                <p>{product.name}</p>
                <p>£{product.price}</p>
                <p>{product.SK.replace('CATEGORY#', '')}</p>
                <img onClick={() => {
                  removeProduct(product.PK)
                }} src={remove_icon} alt="" className='listproduct-remove-icon'/>
              </div>
          )
        })}
      </div>
  )
}
export default ListProduct
