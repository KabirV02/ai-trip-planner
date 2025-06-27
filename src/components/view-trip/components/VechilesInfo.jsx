import React from 'react'
import { Divide } from 'lucide-react'
import VechileCard from './VechileCard'
const VechilesInfo = ({ trip }) => {


    return (
        <div className='mt-10'>
                <h1 className='text-center text-2xl md:text-3xl font-bold '>Vechiles</h1>
            {
                trip.tripData?.travelPlan?.rentedVehicleInformation?.map((curr, idx) => {
                    return (

                        // console.log(curr)
                        <div key={idx} className='mt-5 mb-5'>
                             
                            <p className='text-3xl text-orange-500 font-bold'>{curr?.type}s</p>
                            <div className='md:flex  justify-start  gap-5 h-fit '>
                                {
                                    curr?.vechile?.map((item, idx) => (
                                        <div key={idx}>
                                            <VechileCard vechileInfo={item} tripData={trip} />
                                           
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    )
                })
            }
        </div>
    )
}

export default VechilesInfo