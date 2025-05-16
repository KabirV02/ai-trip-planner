import React, { useEffect, useState } from 'react'
import viewbg from '@/assets/viewTripBg.png'
import { BASE_PHOTO_URL, GetPlaceDetails } from '../view-trip/components/GlobalAPI'
import { Link } from 'react-router-dom'

const MyTripCard = ({trip}) => {
   
   const [photoUrl, setPhotoUrl] = useState([])
   const GetPhotos = async () => {
     const textQuery = trip?.userSelection?.location?.label
     console.log(textQuery)

    if (!textQuery) {
      console.warn("🚫 No location label found. Skipping API call.")
      return
    }

    try {
      const response = await GetPlaceDetails({ textQuery })
      const place = response?.data?.places?.[0]

      if (!place || !place.photos?.length) {
        console.warn("🚫 No photos found for place.")
        return
      }

      // Use the first photo for reliability
      const photoName = place.photos[0].name
      const fullPhotoUrl = BASE_PHOTO_URL.replace('{NAME}', photoName)
      console.log("✅ Google Photo URL:", fullPhotoUrl)

      setPhotoUrl(fullPhotoUrl)
    } catch (error) {
      console.error("❌ Google API error:", error?.response?.data || error.message)
    }
  }

  useEffect(() => {
    console.log(trip)
    if (trip?.userSelection?.location?.label) {
      GetPhotos()
    }
  }, [trip])

  return (
    <Link to={'/view-trip/'+trip?.id} className=' md:h-fit mt-4 hotel-card hover:scale-105 rounded-lg transition-all'>
        <div className='flex flex-col items-center  h-fit  m-4'>
            <img src={photoUrl?photoUrl:viewbg} alt="" className='object-cover rounded-lg h-[400px] w-[600px]' referrerPolicy='no-referrer'/>
            <div className='w-full'>
                <h2 className='text-xl font-bold'>{trip?.userSelection?.location?.label}</h2>
                <h2 className='font-semibold'>{trip?.tripData?.travelPlan?.noOfDays} days with {trip?.tripData?.travelPlan?.budget} </h2>
            </div>
        </div>
        
    </Link>
  )
}

export default MyTripCard