import React from 'react'
import HotelCard from './HotelCard'
const HotelInfo = ({trip}) => {
    
 
  return (
    <div className=' md:h-fit md:w-full'>
        <h2 className='text-center font-bold text-3xl mt-9 mb-9 md:m-9'>Hotel Recommandation</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 rounded-lg  '>
            {trip?.tripData?.travelPlan?.hotels.map((info,index)=>{
              
            return <HotelCard key={index} info={info}/>
            })}
        </div>
    </div>
  )
}

export default HotelInfo