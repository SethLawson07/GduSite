import React from 'react';
import Banner1 from '../../assets/images/banner1.jpg';
import Banner2 from '../../assets/images/banner2.jpg';
import Banner3 from '../../assets/images/banner3.jpg';

import './style.css';

const Banners = ()=>{
    return(
        <div className='bannerSection'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='box'>
                            <img src="https://res.cloudinary.com/dx9yad0tk/image/upload/v1712002726/vkcdi18fty0awr6au4w4.png" className='w-100 transition' />
                        </div>
                    </div>

                    <div className='col'>
                        <div className='box'>
                            <img src="https://res.cloudinary.com/dx9yad0tk/image/upload/v1712042287/qcvvj1ujryhgleqdqltr.png" className='w-100 transition' />
                        </div>
                    </div>

                    <div className='col'>
                        <div className='box'>
                            <img src="https://res.cloudinary.com/dx9yad0tk/image/upload/v1712004370/dfosy3xbb5cw31s8og9m.png" className='w-100 transition' />
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default Banners;