import React from 'react';
import bannerImg from '../../../assets/bannerImg.jpg'
const Banner = () => {
    return (
        <div className='relative h-[400px] md:h-[450px] lg:h-[600px] rounded-lg overflow-hidden'>
                <img className='h-full w-full ' src={bannerImg} alt="" />
            <div className='absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white px-4 text-center space-y-2'>
                <h1 className='text-5xl text-white font-bold'>Empower Your Digital Presence </h1>
                <p className='font-bold text-white text-xl w-3/6'>Discover the power of content, creativity, and connection with our premium platform</p>
                <button className='btn bg-[#00001A] border-0 text-white'>Connect With Us Now</button>
            </div>
        </div>
    );
};

export default Banner;