import React from 'react';
import './style.css';

import img1 from '../../../assets/images/thumbnail-1.jpg';
import img2 from '../../../assets/images/thumbnail-1.jpg';
import img3 from '../../../assets/images/thumbnail-1.jpg';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

const TopProducts = (props) => {
    return (
        <>
            <div className='topSelling_box'>
                <h3>{props.title}</h3>

                <div className='items d-flex align-items-center'>

                    <div className='img'>
                        <Link to="">
                            <img src="https://firebasestorage.googleapis.com/v0/b/bestdistribution-169c9.appspot.com/o/Togo%2FProduitImages%2FYYPk44bJM84GNqHbKrtB?alt=media&token=33f4edcf-1e6e-48ae-853a-e021513e2773" className='w-100' />
                        </Link>
                    </div>


                    <div className='info px-3'>
                        <Link to=""><h4>Riz Gino</h4></Link>
                        <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                        <div className='d-flex align-items-center'>
                            <span className='price text-g font-weight-bold'>7000 Fcfa</span> <span className='oldPrice'>9000 Fcfa</span>
                        </div>
                    </div>
                </div>


                <div className='items d-flex align-items-center'>

                    <div className='img'>
                        <Link to="">
                            <img src="https://firebasestorage.googleapis.com/v0/b/bestdistribution-169c9.appspot.com/o/Togo%2FProduitImages%2FAmwbjNYtfFiy4QvRkt3Z_thumb?alt=media&token=f6b1be51-26e8-4e88-a330-2c804ff9e57c" className='w-100' />
                        </Link>
                    </div>


                    <div className='info px-3'>
                        <Link to=""><h4>SIster Grace</h4></Link>
                        <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                        <div className='d-flex align-items-center'>
                            <span className='price text-g font-weight-bold'>7000 Fcfa</span> <span className='oldPrice'>9000 Fcfa</span> 
                        </div>
                    </div>
                </div>


                <div className='items d-flex align-items-center'>

                    <div className='img'>
                        <Link to="">
                            <img src="https://firebasestorage.googleapis.com/v0/b/bestdistribution-169c9.appspot.com/o/Togo%2FProduitImages%2FpGnfP9V9GvwKC4AgxJJH?alt=media&token=afd108a9-0705-4932-8c3b-20f2f75b2a64" className='w-100' />
                        </Link>
                    </div>


                    <div className='info px-3'>
                        <Link to=""><h4>Riz Délice</h4></Link>
                        <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                        <div className='d-flex align-items-center'>
                            <span className='price text-g font-weight-bold'>7000 Fcfa</span> <span className='oldPrice'>9000 Fcfa</span>
                        </div>
                    </div>
                </div>




            </div>
        </>
    )
}

export default TopProducts;