        import Image from 'next/image'; 
import React from 'react'; 
 
const Hero  = () => { 
    return ( 
        <div className='grid grid-cols-2 justify-between'> 
            <div> 
                <h1>আজকের বাজারের দাম এক নজরে</h1> 
                <p>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p> 
                <button className="btn btn-active bg-green-700 p-2 text-white rounded-[6px]">সব পণ্য দেখুন</button> 
            </div> 
            <div> 
                <Image width={200} 
                height={200} 
                src={'/bazar-hero.png'} alt="bazar"></Image> 
            </div> 
        </div> 
    ); 
}; 
 
export default Hero;