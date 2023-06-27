import React, { useEffect } from 'react'
import './Home.css';
import MetaData from './layout/MetaData';
import {clearErrors, getProduct} from "../actions/productActions";
import {useDispatch, useSelector} from 'react-redux';
import Loader from './layout/Loader/Loader';
import { useAlert } from 'react-alert';
import ProductCard from './ProductCard';


const mouse = <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#6e40c9" className="bi bi-mouse2" viewBox="0 0 16 16">
<g transform="translate(0,0)">
<path d="M3 5.188C3 2.341 5.22 0 8 0s5 2.342 5 5.188v5.625C13 13.658 10.78 16 8 16s-5-2.342-5-5.188V5.189zm4.5-4.155C5.541 1.289 4 3.035 4 5.188V5.5h3.5V1.033zm1 0V5.5H12v-.313c0-2.152-1.541-3.898-3.5-4.154zM12 6.5H4v4.313C4 13.145 5.81 15 8 15s4-1.855 4-4.188V6.5z"/> 
</g>
</svg>

 
const Home = () => {

  const alert=useAlert();
  const dispatch = useDispatch();
  const { loading,error, products} = useSelector(state=>state.products)
  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
  }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  


  return (
    <>
      {loading ? (<Loader/>) : (
        <>
        <MetaData title='Praviaa.com' />
        <div className='banner'>
            <h2>PRAVIAA.</h2>
            <h1>Let's Find Amazing Product</h1>

            <a href='#container'>
                <button>
                   Scroll {mouse}
                </button>
            </a>
        </div>
        <h2 className='homeHeading'>Featured Products</h2>
        <div className='container' id='container'>
          {products && products.map(product => (
            <ProductCard key={product._id} product={product}/>
            ))}
        </div>
      </>
      )}
    </>
  )
}

export default Home