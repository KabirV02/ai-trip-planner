import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import landing1 from '@/assets/landing1.jpg'
import landing2 from '@/assets/landing2.jpg'
import landing3 from '@/assets/landing3.jpg'
import landing4 from '@/assets/landing4.jpg'


const Hero = () => {
  return (
    <>

      <div className='mx-54 flex flex-col items-center gap-8'>

        <h1 className='text-[50px]  font-bold text-center mt-16'>
          <span className='text-orange-400'>Discover Your Next Adventure with AI:</span>
          <p>Personalized Itineraries at Your Fingertips</p>
        </h1>
        <p className='mt-4 text-lg font-semibold text-center text-gray-600'>Your Personal Trip Planner and travel curator,creating itineraries tailored to your intrests and budget</p>
        <Link to={'/create-trip'}>
          <Button className='p-7 text-xl font-bold hover:bg-orange-400 transition-all'>Start Exploring ✈️</Button>
        </Link>

        <div className='w-full mt-4 p-3 grid gap-4'>

          <div className=' grid grid-cols-1  p-5'>
            
            <img src={landing1} alt="" className='h[500px] w-[600px] object-cover rounded-lg ' />
            
          </div>
          <div className=' grid grid-cols-1 justify-items-end '>
            <img src={landing2} alt="" className='h[500px] w-[600px] object-cover rounded-lg' />
          </div>
          <div className=' grid grid-cols-1 '>
            <img src={landing3} alt="" className='h[500px] w-[600px] object-cover rounded-lg' />
          </div>
          <div className=' grid grid-cols-1 justify-items-end'>
            <img src={landing4} alt="" className='h-[450px] w-[600px] object-cover rounded-lg' />
          </div>


        

      </div>
    </div >
   </>
  )
}

export default Hero