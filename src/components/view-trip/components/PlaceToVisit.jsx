import React from 'react'
import PlacesInfo from './PlacesInfo'
import { Link } from 'react-router-dom'

const PlaceToVisit = ({ trip }) => {


    return (
        <div className='mt-10'>
            <h2 className='text-2xl font-bold'>Places To Visit</h2>
            {
                trip?.tripData?.travelPlan?.itinerary.map((curr, idx) => (
                    <div key={idx} className='m-3 flex flex-col gap-2'>
                        <h2 className='text-xl font-bold '>Day: {curr?.day}</h2>
                        <div className='grid md:grid-cols-2 gap-5 h-fit '>
                            {
                                curr?.plan.map((plans, idx) => (
                                    <Link key={idx} to={'https://www.google.com/maps/search/?api=1&query='+plans?.placeName} target='_blank' className='bg-white hover:scale-105 hover:shadow-lg transition-all'>
                                        <div>
                                            <p className='text-orange-500 font-bold'>{plans?.bestTimeToVisit ? plans?.bestTimeToVisit : null}</p>
                                            <PlacesInfo plans={plans} />
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default PlaceToVisit